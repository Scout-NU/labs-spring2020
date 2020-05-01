import { IProblemTag } from '../../types/backend/model';
import { ContentfulListBaseResponse } from '../../types/backend/base';
import { IContentManagementClient, ContentManagementClient } from '../util/client';

export interface IProblemTagService {
    getAllProblemTags(): Promise<IProblemTag[]>;
}

/*
 * This service is responsible for fetching Problem Tags. 
 */
export default class ProblemTagService implements IProblemTagService {
    private allProblemTagsQuery = `${process.env.REACT_APP_CMS_BASE_URL}/entries?&content_type=problemTag`;
    // This is sort of fake dependency injection. I have a section on it in the wiki in the improvements section. It is important for testing.
    private client: IContentManagementClient = new ContentManagementClient();

    async getAllProblemTags(): Promise<IProblemTag[]> {
        return this.getProblemTagsWhere(this.allProblemTagsQuery)
    }
    
    // TODO: Can make a lot of this generic
    async getProblemTagsWhere(query: string): Promise<IProblemTag[]> {
        const problemTagResponse = await this.client.makeRequest(query);
        // TODO: Fallback fields for missing stuff - empty strings and unpublished content is underfined
        let reducedTags: ContentfulListBaseResponse<IProblemTag> = await problemTagResponse.json();
        return reducedTags.items;
    }
}
