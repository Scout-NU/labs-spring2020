import { IProblemTag } from '../../types/cms/generated';
import { ContentfulBaseResponse } from '../../types/cms/base';


export interface IProblemTagService {
    getAllProblemTags(): Promise<IProblemTag[]>;
}

export default function useProblemTagService(): IProblemTagService {
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
    const problemTagResponse = await fetch(
        query,
        {
            method: "GET",
            headers: new Headers({
                Authorization: `Bearer ${process.env.REACT_APP_CONTENTFUL_API_KEY}`
            })
        })

    if (!problemTagResponse.ok) {
        // TODO: Make failed network request better
        throw Error(`${problemTagResponse.status}\n${problemTagResponse.statusText}`)
    };
    // TODO: Fallback fields for missing stuff - empty strings and unpublished content is underfined
    let reducedTags: ContentfulBaseResponse<IProblemTag> = await problemTagResponse.json();
    return reducedTags.items;
}