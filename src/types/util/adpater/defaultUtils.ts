import { IPageLink } from "../../backend/model";
import { ILink } from "../../client/model/link";
import { isResolved } from "../../backend/utils";
import { IAsset } from "../../backend/base";

/**
 * These functions are what provide default values.
 * 
 * REFACTOR: so if we use the method for copy the way I specify in the recommendations part of the wiki, this would change.
 */
export function getStringsOrDefault(field: string[] | undefined) {
    return field ? field : []
}

export function getStringOrDefault(field: string | undefined): string {
    return field ? field : '';
}

export function getPageLinkOrDefault(field: IPageLink | undefined): ILink {
    var title = '';
    var url = '';

    if (field && isResolved(field)) {
        const { fields } = field;
        title = getStringOrDefault(fields.linkDisplayText);
        url = getStringOrDefault(fields.page?.fields.pageEndpoint);
    }

    return {
        linkTitle: title,
        linkURL: url
    }
}

export function getAssetLinkOrDefault(field: IAsset | undefined): string {
    let assetUrl = field?.fields.file.url;
    return assetUrl ? assetUrl : ''
}