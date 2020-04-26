import { IProblemTag } from '../../types/backend/model';
import { ContentfulListBaseResponse } from '../../types/backend/base';
import { makeContentManagementGetRequest } from '../util/http';


export interface IProblemTagService {
    getAllProblemTags(): Promise<IProblemTag[]>;
}

export default function getProblemTagService(): IProblemTagService {
    return {
        getAllProblemTags: getAllProblemTags,
    }
}

const allProblemTagsQuery = `${process.env.REACT_APP_CMS_BASE_URL}/entries?&content_type=problemTag`;

async function getAllProblemTags(): Promise<IProblemTag[]> {
    return getProblemTagsWhere(allProblemTagsQuery)
}

// TODO: Can make a lot of this generic
async function getProblemTagsWhere(query: string): Promise<IProblemTag[]> {
    const problemTagResponse = await makeContentManagementGetRequest(query);
    // TODO: Fallback fields for missing stuff - empty strings and unpublished content is underfined
    let reducedTags: ContentfulListBaseResponse<IProblemTag> = await problemTagResponse.json();
    return reducedTags.items;
}