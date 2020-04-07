import { IAmbassador, IAmbassadorFields, IProblemTag } from '../../types/cms/generated';
import { Resolved, IAsset, isEntry, ILink } from '../../types/cms/base';

interface ContentfulIncludedLinks {
    Entry: any[];
    Asset: IAsset[];
}

interface ContentfulBaseResponse<EntryType> {
    sys: any;
    total: number;
    skip: number;
    limit: number;
    items: Resolved<EntryType>[];
    includes?: ContentfulIncludedLinks;
}

export interface IProfileService {
    // TODO: Error stuff
    getAllProfiles(): Promise<IAmbassador[]>;
    // searchProfiles(queryText: string, departmentFilters: string[], topicFilters: string[]): Promise<void>; 
}

export default function useProfileService(): IProfileService {
    return {
        getAllProfiles: getAllProfiles
    }
}

const allProfilesQuery = `${process.env.REACT_APP_CMS_BASE_URL}/entries?&content_type=ambassador`;

async function getAllProfiles(): Promise<IAmbassador[]> {
    
    // return getProfilesWhere(allProfilesQuery)
    return searchProfiles("",['City Planning', 'Problem Solving'],'');
}


async function searchProfiles(queryy: string, tagFilterss: string[], departmentFilterr: string): Promise<IAmbassador[]> {
    const query = "";
    const departmentFilter = "Mayor's Office of New Urban Mechanics";

    // TODO: make field selection type safe
    var searchQuery = `${allProfilesQuery}` +
    `&fields.department.sys.contentType.sys.id=department` +
    `&fields.department.fields.departmentName[match]=${""}` +
    `&query=${query}`

    let profiles = await getProfilesWhere(searchQuery);
    console.log(profiles)
    return filterByTag(tagFilterss, profiles)
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
        let bodii = await profileResponse.json()
        console.log(bodii)
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