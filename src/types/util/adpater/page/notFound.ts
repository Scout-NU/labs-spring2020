import { INotFoundPageContent } from "../../../backend/model";
import { isResolved } from "../../../backend/utils";
import { getStringOrDefault, getPageLinkOrDefault, getAssetLinkOrDefault } from "../defaultUtils";
import { INotFoundContent } from "../../../client/page/notFound";

export function mapNotFoundPageContent(content: INotFoundPageContent): INotFoundContent {
    if (!isResolved(content)) throw Error("Content must be resolved");

    const { fields } = content;

    return {
        pageHeader: getStringOrDefault(fields.pageHeader),
        pageSubheader: getStringOrDefault(fields.pageSubheader),
        redirectLink: getPageLinkOrDefault(fields.redirectLink),
        helpfulMessage: getStringOrDefault(fields.helpfulMessage),
        decorationURl: getAssetLinkOrDefault(fields.decoration)
    }
}