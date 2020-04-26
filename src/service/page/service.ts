import { IPage } from '../../types/backend/model';
import { ContentfulListBaseResponse } from '../../types/backend/base';
import { resolveEntry } from '../../types/backend/utils';


export interface IPageService {
    getContentForPage(pageName: PageName): Promise<IPage[]>;
}

export enum PageName {
    HOME ="Home Page",
    CONVERSATION_GUIDE="Conversation Guide",
    FAQ="FAQ Page",
    PROFILE="Profile Page",
    SEARCH="Search Page",
    NOT_FOUND="Not Found Page"
}

export default function getPageService(): IPageService {
    return {
        getContentForPage: getContentForPage,
    }
}

const allPagesQuery = `${process.env.REACT_APP_CMS_BASE_URL}/entries?&content_type=page&include=10`;

async function getContentForPage(pageName: PageName): Promise<IPage[]> {
    const pageQuery = `${allPagesQuery}&fields.pageName=${pageName}`;

    const pageResponse = await fetch(
        pageQuery,
        {
            method: "GET",
            headers: new Headers({
                Authorization: `Bearer ${process.env.REACT_APP_CONTENTFUL_API_KEY}`
            })
        })

    if (!pageResponse.ok) {
        // TODO: Make failed network request better
        throw Error(`${pageResponse.status}\n${pageResponse.statusText}`)
    };
    // TODO: Fallback fields for missing stuff - empty strings and unpublished content is underfined
    let reducedPages: ContentfulListBaseResponse<IPage> = await pageResponse.json();
    return parseDepartmentResponse(reducedPages);
}

function parseDepartmentResponse(response: ContentfulListBaseResponse<IPage>): IPage[] {
    return response.items.map(d => resolveEntry(d, response.includes!!));
}