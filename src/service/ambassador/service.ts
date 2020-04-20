import { IAmbassador } from '../../types/backend/model';
import { isEntry, ContentfulListBaseResponse } from '../../types/backend/base';
import { resolveEntry } from '../../types/backend/utils';
import { makeContentManagementGetRequest, validateResponse } from '../util/http';

export interface IProfileService {
    getAllProfiles(): Promise<IAmbassador[]>;
    searchProfiles(queryText: string, filters: Map<string, string[]>): Promise<IAmbassador[]>; 
    getProfileById(id: string): Promise<IAmbassador>;
}

export default function getProfileService(): IProfileService {
    return {
        getAllProfiles: getAllProfiles,
        searchProfiles: searchProfiles,
        getProfileById: getProfileById
    }
}

const allProfilesQuery = `${process.env.REACT_APP_CMS_BASE_URL}/entries?&content_type=ambassador&include=2`;

async function getAllProfiles(): Promise<IAmbassador[]> {
    return getProfilesWhere(allProfilesQuery)
}

async function getProfileById(id: string): Promise<IAmbassador> {
    let byIdQuery = `${allProfilesQuery}&sys.id=${id}`
    let profiles = await getProfilesWhere(byIdQuery);
    return profiles[0];  
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
    return ambassadors.filter((ambassador) => 
        ambassador.fields.tags?.some((tag) => isEntry(tag) && tagFilters.has(tag.fields.tagName ? tag.fields.tagName : '')))
}

async function getProfilesWhere(query: string): Promise<IAmbassador[]> {
    const profileResponse = await makeContentManagementGetRequest(query);
    validateResponse(profileResponse);

    // TODO: Fallback fields for missing stuff - empty strings and unpublished content is underfined
    let reducedProfiles: ContentfulListBaseResponse<IAmbassador> = await profileResponse.json();    
    return reducedProfiles.items.map((person) => resolveEntry(person, reducedProfiles.includes!!))
}