import { IAmbassador } from '../../types/backend/model';
import { isEntry, ContentfulListBaseResponse } from '../../types/backend/base';
import { resolveEntry } from '../../types/backend/utils';
import { ContentManagementClient, IContentManagementClient } from '../util/client';

export interface IProfileService {
    getAllProfiles(limit?: number): Promise<IAmbassador[]>;
    searchProfiles(queryText: string, filters: Map<string, string[]>): Promise<IAmbassador[]>; 
    getProfileById(id: string): Promise<IAmbassador>;
}

/**
 * This class is responsible for fetching Ambassadors from the CMS. It provides functionality to fetch everything,
 * search based on given parameters, and fetch specific profiles by ID.
 */
export default class ProfileService implements IProfileService {
    private allProfilesQuery = `${process.env.REACT_APP_CMS_BASE_URL}/entries?&content_type=ambassador&include=2`;
    // This is sort of fake dependency injection. I have a section on it in the wiki in the improvements section. It is important for testing.
    private client: IContentManagementClient = new ContentManagementClient()

    async getAllProfiles(limit: number = 100): Promise<IAmbassador[]> {
        return this.parseProfileResponse(await this.getProfilesWhere(`${this.allProfilesQuery}&limit=${limit}`), true)
    }
    
    async getProfileById(id: string): Promise<IAmbassador> {
        let byIdQuery = `${this.allProfilesQuery}&sys.id=${id}`
        let profiles = await this.getProfilesWhere(byIdQuery);
        return this.parseProfileResponse(profiles)[0];  
    }
    
    async searchProfiles(queryText: string, filters: Map<string, string[]>): Promise<IAmbassador[]> {
        let departmentFilters = filters.get('departments');
        let topicFilters = filters.get('topics');
    
        // TODO: make field selection type safe?
        var searchQuery = `${this.allProfilesQuery}&query=${queryText}`;
    
        if (departmentFilters) {
            searchQuery +=
            `&fields.department.sys.contentType.sys.id=department` +
            `&fields.department.fields.departmentName[in]=${departmentFilters.join(',')}`
        }
        
        let result = this.parseProfileResponse(await this.getProfilesWhere(searchQuery), true);
        return topicFilters ? this.filterByTag(topicFilters, result) : result;
    }
    
    // Sadly we cannot filter by tag in a network call with Contentful, so it must be done client side for now. Alas.
    private filterByTag(desiredTags: string[], ambassadors: IAmbassador[]): IAmbassador[] {
        // If there are no filters, don't filter.
        if (desiredTags.length === 0) return ambassadors
        const tagFilters: Set<string> = new Set(desiredTags);
        return ambassadors.filter((ambassador) => 
            ambassador.fields.tags?.some((tag) => isEntry(tag) && tagFilters.has(tag.fields.tagName ? tag.fields.tagName : '')))
    }
    
    private async getProfilesWhere(query: string): Promise<ContentfulListBaseResponse<IAmbassador>> {
        const profileResponse = await this.client.makeRequest(query);
        let response = await profileResponse.json();
        return response;
    }
    
    // TODO: Fallback fields for missing stuff - empty strings and unpublished content is underfined
    // See utils.ts#resolveEntry for why we might not care about broken links for the moment.
    private parseProfileResponse(response: ContentfulListBaseResponse<IAmbassador>, ignoreMissingLinks: boolean = false): IAmbassador[] {
        return response.items.map((person) => resolveEntry(person, response.includes!!, ignoreMissingLinks))
    }
}