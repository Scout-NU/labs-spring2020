import { isResolved } from "../../../backend/utils";
import { getStringOrDefault, getStringsOrDefault } from "../defaultUtils";
import { IEmailFormContent } from "../../../backend/model";
import { IMailFormContent } from "../../../client/component/emailForm";

export function mapResolvedEmailFormContent(content: IEmailFormContent): IMailFormContent {
    if (!isResolved(content)) throw Error("Content must be resolved");

    const { fields } = content;

    return {
        formHeader: getStringOrDefault(fields.formHeader),
        formDescription: getStringOrDefault(fields.formDescription),
        nameFieldLabel: getStringOrDefault(fields.nameFieldLabel),
        nameFieldHint: getStringOrDefault(fields.nameFieldHint),
        emailFieldLabel: getStringOrDefault(fields.emailFieldLabel),
        studentEmailFieldHint: getStringOrDefault(fields.studentEmailFieldHint),
        subjectFieldLabel: getStringOrDefault(fields.subjectFieldLabel),
        subjectFieldHint: getStringOrDefault(fields.subjectFieldHint),
        messageFieldLabel: getStringOrDefault(fields.messageFieldLabel),
        messageFieldHint: getStringOrDefault(fields.messageFieldHint),
        messageFieldSuggestions: getStringsOrDefault(fields.messageFieldSuggestions),
        submitLabel: getStringOrDefault(fields.submitLabel),
        successfulSendMessageHeader: getStringOrDefault(fields.successfulSendMessageHeader),
        successfulSendMessageBody: getStringOrDefault(fields.successfulSendMessageBody),
        failedSendMessageHeader: getStringOrDefault(fields.failedSendMessageHeader),
        failedSendMessageBody: getStringOrDefault(fields.failedSendMessageBody)
    }
}