import { IProfilePageContent } from "../../../backend/model";
import { isResolved } from "../../../backend/utils";
import { getStringOrDefault } from "../defaultUtils";
import { IProfileContent } from "../../../client/page/profile";

export function mapProfilePageContent(content: IProfilePageContent): IProfileContent {
    if (!isResolved(content)) throw Error("Content must be resolved");

    const { fields } = content;

    return {
        ambassadorDescriptionHeader: getStringOrDefault(fields.ambassadorDescriptionHeader),
        emailMeLabel: getStringOrDefault(fields.emailMeLabel),
        seeMoreDepartmentWorkLabel: getStringOrDefault(fields.seeMoreDepartmentWorkLabel),
        projectSectionHeader: getStringOrDefault(fields.projectSectionHeader),
        relatedAmbassadorsSectionHeader: getStringOrDefault(fields.relatedAmbassadorsSectionHeader)
    }
}