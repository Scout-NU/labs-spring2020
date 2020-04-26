import { IPage, PagePageContent, INotFoundPageContent, IConnectionGuideContent, IFaqPageContent, IHomePageContent, IProfilePageContent, ISearchPageContent, PageDiscriminator, isHomePageContent, isConnectionGuideContent, isFaqPageContent, isProfilePageContent, isSearchPageContent, isNotFoundPageContent } from '../../types/backend/model';
import { ContentfulListBaseResponse, isEntry, Resolved } from '../../types/backend/base';
import { resolveEntry } from '../../types/backend/utils';


export interface IPageService {
    getHomePageContent(): Promise<IHomePageContent>;
    getConversationPageContent(): Promise<IConnectionGuideContent>;
    getFaqPageContent(): Promise<IFaqPageContent>;
    getProfilePageContent(): Promise<IProfilePageContent>;
    getSearchPageContent(): Promise<ISearchPageContent>;
    getNotFoundPageContent(): Promise<INotFoundPageContent>;
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
        getHomePageContent: getHomePageContent,
        getConversationPageContent: getConversationPageContent,
        getFaqPageContent: getFaqPageContent,
        getProfilePageContent: getProfilePageContent,
        getSearchPageContent: getSearchPageContent,
        getNotFoundPageContent: getNotFoundPageContent
    }
}

getContentForPage(PageDiscriminator.HOME)

const allPagesQuery = `${process.env.REACT_APP_CMS_BASE_URL}/entries?&content_type=page&include=10`;

async function getHomePageContent(): Promise<IHomePageContent> {
    let content = await getContentForPage(PageDiscriminator.HOME);
    if (!isHomePageContent(content)) throw Error(`Page content for ${PageDiscriminator.HOME} could not be found`);
    return content;
}

async function getConversationPageContent(): Promise<IConnectionGuideContent> {
    let content = await getContentForPage(PageDiscriminator.CONVERSATION_GUIDE);
    if (!isConnectionGuideContent(content)) throw Error(`Page content for ${PageDiscriminator.CONVERSATION_GUIDE} could not be found`);
    return content;
}

async function getFaqPageContent(): Promise<IFaqPageContent> {
    let content = await getContentForPage(PageDiscriminator.FAQ);
    if (!isFaqPageContent(content)) throw Error(`Page content for ${PageDiscriminator.FAQ} could not be found`);
    return content;
}

async function getProfilePageContent(): Promise<IProfilePageContent> {
    let content = await getContentForPage(PageDiscriminator.PROFILE);
    if (!isProfilePageContent(content)) throw Error(`Page content for ${PageDiscriminator.PROFILE} could not be found`);
    return content;
}

async function getSearchPageContent(): Promise<ISearchPageContent> {
    let content = await getContentForPage(PageDiscriminator.SEARCH);
    if (!isSearchPageContent(content)) throw Error(`Page content for ${PageDiscriminator.SEARCH} could not be found`);
    return content;
}

async function getNotFoundPageContent(): Promise<INotFoundPageContent> {
    let content = await getContentForPage(PageDiscriminator.NOT_FOUND);
    if (!isNotFoundPageContent(content)) throw Error(`Page content for ${PageDiscriminator.NOT_FOUND} could not be found`);
    return content;
}

async function getContentForPage(pageName: PageDiscriminator): Promise<PagePageContent> {
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
    return parsePageResponse(reducedPages)[0].fields.pageContent!!;
}


function parsePageResponse(response: ContentfulListBaseResponse<IPage>): Resolved<IPage>[] {
    return response.items.map(d => resolveEntry(d, response.includes!!));
}