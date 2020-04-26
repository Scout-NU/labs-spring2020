import { IFaqPageContent, ICmsFaq, ICmsFaqLink } from "../../../backend/model";
import { isResolved } from "../../../backend/utils";
import { getStringOrDefault, getStringsOrDefault } from "../defaultUtils";
import { IFaqContent, IFaq, IFaqLink } from "../../../client/page/faq";

export function mapFaqContent(content: IFaqPageContent): IFaqContent {
    if (!isResolved(content)) throw Error("Content must be resolved");

    const { fields } = content;

    return {
        pageHeader: getStringOrDefault(fields.pageHeader),
        furtherQuestionHeader: getStringOrDefault(fields.furtherQuestionHeader),
        furtherHelpEmail: getStringOrDefault(fields.furtherHelpEmail),
        furtherHelpHeader: getStringOrDefault(fields.furtherHelpHeader),
        faqs: mapResolvedFaqs(fields.faQs)
    }
}

function mapResolvedFaqs(content: ICmsFaq[] | undefined): IFaq[] {
    return content ? content.map(s => mapResolvedFaq(s)) : [];
}

function mapResolvedFaq(content: ICmsFaq): IFaq {
    if (!isResolved(content)) throw Error("Content must be resolved");

    const { fields } = content;

    return {
        title: getStringOrDefault(fields.title),
        description: getStringOrDefault(fields.description),
        suggestions: getStringsOrDefault(fields.suggestions),
        links: mapResolvedFaqLinks(fields.links)
    }
}

function mapResolvedFaqLinks(content: ICmsFaqLink[] | undefined): IFaqLink[] {
    return content ? content.map(s => mapResolvedFaqLink(s)) : [];
}

function mapResolvedFaqLink(content: ICmsFaqLink): IFaqLink {
    if (!isResolved(content)) throw Error("Content must be resolved");
    const { fields } = content;

    return {
        url: {
            linkTitle: getStringOrDefault(fields.linkDisplayText),
            linkURL: getStringOrDefault(fields.linkUrl),
        },
        description: getStringOrDefault(fields.linkDescriptino)
    }

}