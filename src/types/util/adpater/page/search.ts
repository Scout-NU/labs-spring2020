import { ISearchPageContent } from "../../../backend/model";
import { isResolved } from "../../../backend/utils";
import { getStringOrDefault, getAssetLinkOrDefault, getStringsOrDefault } from "../defaultUtils";
import { ISearchContent } from "../../../client/page/search";

export function mapSearchPageContent(content: ISearchPageContent): ISearchContent {
    if (!isResolved(content)) throw Error("Content must be resolved");

    const { fields } = content;

    return {
        pageHeader: getStringOrDefault(fields.pageHeader),
        pageSubheader: getStringOrDefault(fields.pageSubheader),
        noResultsHeader: getStringOrDefault(fields.noResultsHeader),
        noResultsImageUrl: getAssetLinkOrDefault(fields.noResultsImage),
        noResultsSuggestions: getStringsOrDefault(fields.noResultsSuggestions),
        searchBarHint: getStringOrDefault(fields.searchBarHint),
    }
}