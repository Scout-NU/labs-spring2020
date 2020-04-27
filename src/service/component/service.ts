import { IEmailFormContent, IFooterContent, IHeaderContent, isEmailFormContent, isHeaderContent, isFooterContent } from '../../types/backend/model';
import { ContentfulListBaseResponse, Resolved } from '../../types/backend/base';
import { resolveEntry } from '../../types/backend/utils';
import { makeContentManagementGetRequest } from '../util/http';

type ComponentContent = IFooterContent | IHeaderContent | IEmailFormContent;

export interface IPageService {
    getEmailFormContent(): Promise<IEmailFormContent>;
    getHeaderContent(): Promise<IHeaderContent>;
    getFooterContent(): Promise<IFooterContent>;
}

export enum ComponentID {
    EMAIL_FORM = "4pihJiEPijQJwqOMYJnyMP",
    HEADER = "5iX7OOfRtMKd4QLhhLYqrm",
    FOOTER = "LYGsX31RSrXGNA5dtgdAK"
}

// TODO: I messed this up because I forgot to include a unifying type like Page, don't want to migrate the types again right now...Have to use this
export enum ComponentType {
    EMAIL_FORM = "emailFormContent",
    FOOTER = "footerContent",
    HEADER = "headerContent"
}

export default function getComponentService(): IPageService {
    return {
        getEmailFormContent: getEmailFormContent,
        getHeaderContent: getHeaderContent,
        getFooterContent: getFooterContent
    }
}


const allComponentsQuery = `${process.env.REACT_APP_CMS_BASE_URL}/entries?&include=10`;

async function getEmailFormContent(): Promise<IEmailFormContent> {
    let content = await getContentForComponent(ComponentID.EMAIL_FORM, ComponentType.EMAIL_FORM);
    if (!isEmailFormContent(content)) throw Error(`Component content for ${ComponentID.EMAIL_FORM} could not be found`);
    return content;
}

async function getHeaderContent(): Promise<IHeaderContent> {
    let content = await getContentForComponent(ComponentID.HEADER, ComponentType.HEADER);
    if (!isHeaderContent(content)) throw Error(`Component content for ${ComponentID.HEADER} could not be found`);
    return content;
}

async function getFooterContent(): Promise<IFooterContent> {
    let content = await getContentForComponent(ComponentID.FOOTER, ComponentType.FOOTER);
    if (!isFooterContent(content)) throw Error(`Component content for ${ComponentID.FOOTER} could not be found`);
    return content;
}

async function getContentForComponent(componentName: ComponentID, componentType: ComponentType): Promise<ComponentContent> {
    const comonentQuery = `${allComponentsQuery}&content_type=${componentType}&sys.id=${componentName}`;
    const componentResponse = await makeContentManagementGetRequest(comonentQuery);
    let reducedComponents: ContentfulListBaseResponse<ComponentContent> = await componentResponse.json();
    console.log(reducedComponents)
    return parseComponentResponse(reducedComponents)[0];
}


function parseComponentResponse(response: ContentfulListBaseResponse<ComponentContent>): Resolved<ComponentContent>[] {
    return response.items.map(d => resolveEntry(d, response.includes!!));
}