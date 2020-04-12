import { IAmbassador } from '../../types/cms/generated';
import { isEntry, ContentfulBaseResponse, ContentfulIncludedLinks } from '../../types/cms/base';


export interface IProfileService {
    getAllProfiles(): Promise<IAmbassador[]>;
    searchProfiles(queryText: string, filters: Map<string, string[]>): Promise<IAmbassador[]>; 
}

export default function useProfileService(): IProfileService {
    return {
        getAllProfiles: getAllProfiles,
        searchProfiles: searchProfiles
    }
}

const allProfilesQuery = `${process.env.REACT_APP_CMS_BASE_URL}/entries?&content_type=ambassador`;

async function getAllProfiles(): Promise<IAmbassador[]> {
    return getProfilesWhere(allProfilesQuery)
}

async function searchProfiles(queryText: string, filters: Map<string, string[]>): Promise<IAmbassador[]> {
    let departmentFilters = filters.get('departments');
    let topicFilters = filters.get('topics');

    // TODO: make field selection type safe?
    var searchQuery = `${allProfilesQuery}&query=${queryText}`;

    if (departmentFilters) {
        searchQuery +=
        `&fields.department.sys.contentType.sys.id=department` +
        `&fields.department.fields.departmentName[in]=${departmentFilters.join(',')}`
    }
    
    let result = await getProfilesWhere(searchQuery);

    return topicFilters ? filterByTag(topicFilters, result) : result;
}

// Sadly we cannot filter by tag in a network call with Contentful, so it must be done client side for now. Alas.
function filterByTag(desiredTags: string[], ambassadors: IAmbassador[]): IAmbassador[] {
    // If there are no filters, don't filter.
    if (desiredTags.length === 0) return ambassadors

    const tagFilters: Set<string> = new Set(desiredTags);

    // desiredTags.forEach((tag) => {
    //     if (tag.fields.tagName !== undefined) {
    //         tagFilters.add(tag.fields.tagName)
    //     }
    //  })

    return ambassadors.filter((ambassador) => 
        ambassador.fields.tags?.some((tag) => isEntry(tag) && tagFilters.has(tag.fields.tagName ? tag.fields.tagName : '')))
}

async function getProfilesWhere(query: string): Promise<IAmbassador[]> {
    const profileResponse = await fetch(
        query,
        {
            method: "GET",
            headers: new Headers({
                Authorization: `Bearer ${process.env.REACT_APP_CONTENTFUL_API_KEY}`
            })
        })
    if (!profileResponse.ok) {
        // TODO: Make failed network request better
        throw Error(`${profileResponse.status}\n${profileResponse.statusText}`)
    };
    // TODO: Fallback fields for missing stuff - empty strings and unpublished content is underfined
    let reducedProfiles: ContentfulBaseResponse<IAmbassador> = await profileResponse.json();    
    return reducedProfiles.items.map((person) => resolveAmbassadorLinks(person, reducedProfiles.includes!!))
}


function resolveAmbassadorLinks(person: IAmbassador, assets: ContentfulIncludedLinks): IAmbassador {
    let assetId = person?.fields?.profilePicture?.sys.id;
    let tagIds = person?.fields?.tags?.map((tag) => tag.sys.id);

    return {
        ...person,
        fields: {
            ...person.fields,
            profilePicture: assets.Asset.find((asset) => asset.sys.id === assetId)!!,
            tags: tagIds?.map((id) => assets.Entry.find((entry) => entry.sys.id === id)!!)!!
        }
    }
}    