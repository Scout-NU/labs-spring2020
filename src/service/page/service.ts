import { IPage, PagePageContent, INotFoundPageContent, IConnectionGuideContent, IFaqPageContent, IHomePageContent, IProfilePageContent, ISearchPageContent, PageDiscriminator, isHomePageContent, isConnectionGuideContent, isFaqPageContent, isProfilePageContent, isSearchPageContent, isNotFoundPageContent } from '../../types/backend/model';
import { ContentfulListBaseResponse, Resolved } from '../../types/backend/base';
import { resolveEntry } from '../../types/backend/utils';
import { ContentManagementClient } from '../util/client';


export interface IPageService {
    getHomePageContent(): Promise<IHomePageContent>;
    getConversationPageContent(): Promise<IConnectionGuideContent>;
    getFaqPageContent(): Promise<IFaqPageContent>;
    getProfilePageContent(): Promise<IProfilePageContent>;
    getSearchPageContent(): Promise<ISearchPageContent>;
    getNotFoundPageContent(): Promise<INotFoundPageContent>;
}

/**
 * This class is responsible for fetching page content.
 * 
 * REFACTOR: So I went a specific route with managing page content in this, and I wish I didn't. 
 * Please see the recommended improvements section in the github wiki for more informtion.
 */
export default class PageService implements IPageService {
    private allPagesQuery = `${process.env.REACT_APP_CMS_BASE_URL}/entries?&content_type=page&include=10`;
    // This is sort of fake dependency injection. I have a section on it in the wiki in the improvements section. It is important for testing.
    private client = new ContentManagementClient();

    async getHomePageContent(): Promise<IHomePageContent> {
        let content = await this.getContentForPage(PageDiscriminator.HOME);
        if (!isHomePageContent(content)) throw Error(`Page content for ${PageDiscriminator.HOME} could not be found`);
        return content;
    }

    async getConversationPageContent(): Promise<IConnectionGuideContent> {
        let content = await this.getContentForPage(PageDiscriminator.CONVERSATION_GUIDE);
        if (!isConnectionGuideContent(content)) throw Error(`Page content for ${PageDiscriminator.CONVERSATION_GUIDE} could not be found`);
        return content;
    }

    async getFaqPageContent(): Promise<IFaqPageContent> {
        let content = await this.getContentForPage(PageDiscriminator.FAQ);
        if (!isFaqPageContent(content)) throw Error(`Page content for ${PageDiscriminator.FAQ} could not be found`);
        return content;
    }

    async getProfilePageContent(): Promise<IProfilePageContent> {
        let content = await this.getContentForPage(PageDiscriminator.PROFILE);
        if (!isProfilePageContent(content)) throw Error(`Page content for ${PageDiscriminator.PROFILE} could not be found`);
        return content;
    }

    async getSearchPageContent(): Promise<ISearchPageContent> {
        let content = await this.getContentForPage(PageDiscriminator.SEARCH);
        if (!isSearchPageContent(content)) throw Error(`Page content for ${PageDiscriminator.SEARCH} could not be found`);
        return content;
    }

    async getNotFoundPageContent(): Promise<INotFoundPageContent> {
        let content = await this.getContentForPage(PageDiscriminator.NOT_FOUND);
        if (!isNotFoundPageContent(content)) throw Error(`Page content for ${PageDiscriminator.NOT_FOUND} could not be found`);
        return content;
    }

    async getContentForPage(pageName: PageDiscriminator): Promise<PagePageContent> {
        const pageQuery = `${this.allPagesQuery}&fields.pageName=${pageName}`;
        const pageResponse = await this.client.makeRequest(pageQuery);
        let reducedPages: ContentfulListBaseResponse<IPage> = await pageResponse.json();
        return this.parsePageResponse(reducedPages)[0].fields.pageContent!!;
    }


    private parsePageResponse(response: ContentfulListBaseResponse<IPage>): Resolved<IPage>[] {
        return response.items.map(d => resolveEntry(d, response.includes!!));
    }
}