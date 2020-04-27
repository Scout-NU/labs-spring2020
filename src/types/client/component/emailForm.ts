export interface IMailFormContent {
    formHeader: string;
    formDescription: string;
    nameFieldLabel: string;
    nameFieldHint: string;
    emailFieldLabel: string;
    studentEmailFieldHint: string;
    subjectFieldLabel: string;
    subjectFieldHint: string;
    messageFieldLabel: string;
    messageFieldHint: string;
    messageFieldSuggestions: string[];
    submitLabel: string;
    successfulSendMessageHeader: string;
    successfulSendMessageBody: string;
    failedSendMessageHeader: string;
    failedSendMessageBody: string;
}