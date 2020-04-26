import { IUrl, IPageLink } from "../../../backend/model";
import { ILink } from "../../../client/model/link";
import { Resolved } from "../../../backend/base";

export function resolveUrlLink(url?: IUrl): ILink {
    if (!url) return getDefaultLink();
    return {
        linkURL: url.fields.urlDestination,
        linkTitle: url.fields.urlDisplayText,
    }
}

export function resolvePageLink(pageLink?: Resolved<IPageLink>): ILink {
    if (!pageLink) return getDefaultLink();

    const { fields } = pageLink;

    return {
        linkURL: `${window.location.host}/${fields.page?.fields.pageEndpoint}`,
        linkTitle: fields.linkDisplayText ? fields.linkDisplayText : ''
    }
}

function getDefaultLink(): ILink {
    return {
        linkURL: '',
        linkTitle: ''
    }
}