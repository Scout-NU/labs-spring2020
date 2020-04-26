import { IHomePageContent, ICommunicationStep } from "../../../backend/model";
import { IHomeContent, ICommunicationStepPreview } from "../../../client/page/home";
import { isResolved } from "../../../backend/utils";
import { getStringOrDefault, getPageLinkOrDefault, getAssetLinkOrDefault, getStringsOrDefault } from "../defaultUtils";

export function mapHomeContent(content: IHomePageContent): IHomeContent {
    if (!isResolved(content)) throw Error("Content must be resolved");

    const { fields } = content;

    return {
        siteBannerText: getStringOrDefault(fields.siteBannerText),
        pageHeader: getStringOrDefault(fields.pageHeader),
        pageSubheader: getStringOrDefault(fields.pageHeader),
        exploreLink: getPageLinkOrDefault(fields.exploreLink),
        headerDecorationUrl: getAssetLinkOrDefault(fields.headerDecoration),
        communicationStepsHeader: getStringOrDefault(fields.communicationStepsHeader),
        communicationSteps: mapResolvedCommunicationSteps(fields.communicationSteps),
        civicsActionTeamInfoHeader: getStringOrDefault(fields.civicsActionTeamInfoHeader),
        civicsActionTeamInfoSubheader: getStringOrDefault(fields.civicsActionTeamInfoSubheader),
        civicsActionTeamCapabilities: getStringsOrDefault(fields.civicsActionTeamCapabilities),
        furtherHelpLink: getPageLinkOrDefault(fields.furtherHelpLink)
    }
}

function mapResolvedCommunicationSteps(content: ICommunicationStep[] | undefined): ICommunicationStepPreview[] {
    return content ? content.map(s => mapResolvedCommunicationStep(s)) : [];
}

function mapResolvedCommunicationStep(content: ICommunicationStep): ICommunicationStepPreview {
    if (!isResolved(content)) throw Error("Content must be resolved");

    const { fields } = content;

    return {
        stepPictureUrl: getAssetLinkOrDefault(fields.stepPicture),
        stepTitle: getStringOrDefault(fields.stepTitle),
        stepDescription: getStringOrDefault(fields.stepDescription)
    }
}