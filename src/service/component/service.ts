import { IEmailFormContent, IFooterContent, IHeaderContent, isEmailFormContent, isHeaderContent, isFooterContent } from '../../types/backend/model';
import { ContentfulListBaseResponse, Resolved } from '../../types/backend/base';
import { resolveEntry } from '../../types/backend/utils';
import { IContentManagementClient, ContentManagementClient } from '../util/client';

type ComponentContent = IFooterContent | IHeaderContent | IEmailFormContent;

export interface IComponentService {
    getEmailFormContent(): Promise<IEmailFormContent>;
    getHeaderContent(): Promise<IHeaderContent>;
    getFooterContent(): Promise<IFooterContent>;
}

enum ComponentID {
    EMAIL_FORM = "4pihJiEPijQJwqOMYJnyMP",
    HEADER = "5iX7OOfRtMKd4QLhhLYqrm",
    FOOTER = "LYGsX31RSrXGNA5dtgdAK"
}

// REFACTOR: Introduce a unifying type like IPage in Contentful so that we don't have to fetch specific content_types
enum ComponentType {
    EMAIL_FORM = "emailFormContent",
    FOOTER = "footerContent",
    HEADER = "headerContent"
}

/**
 * This class is responsible for fetching copy for individual components.
 * 
 * REFACTOR: So I went a specific route with managing component content in this, and I wish I didn't. 
 * Please see the recommended improvements section in the github wiki for more informtion.
 */
export default class ComponentService implements IComponentService {
    private allComponentsQuery = `${process.env.REACT_APP_CMS_BASE_URL}/entries?&include=10`;
    // This is sort of fake dependency injection. I have a section on it in the wiki in the improvements section. It is important for testing.
    private client: IContentManagementClient = new ContentManagementClient()

    async getEmailFormContent(): Promise<IEmailFormContent> {
        let content = await this.getContentForComponent(ComponentID.EMAIL_FORM, ComponentType.EMAIL_FORM);
        if (!isEmailFormContent(content)) throw Error(`Component content for ${ComponentID.EMAIL_FORM} could not be found`);
        return content;
    }

    async getHeaderContent(): Promise<IHeaderContent> {
        let content = await this.getContentForComponent(ComponentID.HEADER, ComponentType.HEADER);
        if (!isHeaderContent(content)) throw Error(`Component content for ${ComponentID.HEADER} could not be found`);
        return content;
    }

    async getFooterContent(): Promise<IFooterContent> {
        let content = await this.getContentForComponent(ComponentID.FOOTER, ComponentType.FOOTER);
        if (!isFooterContent(content)) throw Error(`Component content for ${ComponentID.FOOTER} could not be found`);
        return content;
    }

    async getContentForComponent(componentName: ComponentID, componentType: ComponentType): Promise<ComponentContent> {
        // This is what I mean about needing to specify content_type as opposed to how it works in the page service
        const comonentQuery = `${this.allComponentsQuery}&content_type=${componentType}&sys.id=${componentName}`;
        const componentResponse = await this.client.makeRequest(comonentQuery);
        let reducedComponents: ContentfulListBaseResponse<ComponentContent> = await componentResponse.json();
        return this.parseComponentResponse(reducedComponents)[0];
    }


    private parseComponentResponse(response: ContentfulListBaseResponse<ComponentContent>): Resolved<ComponentContent>[] {
        return response.items.map(d => resolveEntry(d, response.includes!!));
    }
}


