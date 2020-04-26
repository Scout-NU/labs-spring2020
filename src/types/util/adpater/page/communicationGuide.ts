import { IConnectionGuideContent, IConnectionStep } from "../../../backend/model";
import { isResolved } from "../../../backend/utils";
import { getStringOrDefault, getStringsOrDefault, getAssetLinkOrDefault } from "../defaultUtils";
import { ICommunicationGuideContent, IDetailedConnectionStep } from "../../../client/page/communicationGuide";

export function mapCommunicationGuideContent(content: IConnectionGuideContent): ICommunicationGuideContent {
    if (!isResolved(content)) throw Error("Content must be resolved");

    const { fields } = content;

    return {
        pageHeader: getStringOrDefault(fields.pageHeader),
        pageSubheader: getStringOrDefault(fields.pageSubheader),
        headerDecorationPageUrl: getAssetLinkOrDefault(fields.headerDecoration),
        remindersIconUrl: getAssetLinkOrDefault(fields.remindersIcon),
        remindersHeader: getStringOrDefault(fields.remindersHeader),
        reminders: getStringsOrDefault(fields.reminders),
        connectionSteps: mapResolvedConnectionSteps(fields.connectionSteps)
    }
}

function mapResolvedConnectionSteps(content: IConnectionStep[] | undefined): IDetailedConnectionStep[] {
    return content ? content.map(s => mapResolvedConnectionStep(s)) : [];
}

function mapResolvedConnectionStep(content: IConnectionStep): IDetailedConnectionStep {
    if (!isResolved(content)) throw Error("Content must be resolved");

    const { fields } = content;

    return {
        stepTitle: getStringOrDefault(fields.stepTitle),
        stepDetails: getStringsOrDefault(fields.stepDetails)
    }
}