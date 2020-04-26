import { Entry, IEntry, ISys } from "../base";

export interface IEmailFormContentFields {
  formHeader?: string;
  formDescription?: string;
  nameFieldLabel?: string;
  nameFieldHint?: string;
  emailFieldLabel?: string;
  studentEmailFieldHint?: string;
  subjectFieldLabel?: string;
  subjectFieldHint?: string;
  messageFieldLabel?: string;
  messageFieldHint?: string;
  messageFieldSuggestions?: string[];
  submitLabel?: string;
  successfulSendMessageHeader?: string;
  successfulSendMessageBody?: string;
  failedSendMessageHeader?: string;
  failedSendMessageBody?: string;
}

/**
 * Email Form Content
 * Copy for the email form.
 */
export interface IEmailFormContent extends IEntry<IEmailFormContentFields> {
}

export function isEmailFormContent(entry: IEntry<any>): entry is IEmailFormContent {
  return entry &&
    entry.sys &&
    entry.sys.contentType &&
    entry.sys.contentType.sys &&
    entry.sys.contentType.sys.id == 'emailFormContent'
}

export class EmailFormContent extends Entry<IEmailFormContentFields> implements IEmailFormContent {
  public readonly sys!: ISys<'Entry'>;
  public readonly fields!: IEmailFormContentFields;

  get formHeader(): string | undefined {
    return this.fields.formHeader
  }

  get form_header(): string | undefined {
    return this.fields.formHeader
  }

  get formDescription(): string | undefined {
    return this.fields.formDescription
  }

  get form_description(): string | undefined {
    return this.fields.formDescription
  }

  get nameFieldLabel(): string | undefined {
    return this.fields.nameFieldLabel
  }

  get name_field_label(): string | undefined {
    return this.fields.nameFieldLabel
  }

  get nameFieldHint(): string | undefined {
    return this.fields.nameFieldHint
  }

  get name_field_hint(): string | undefined {
    return this.fields.nameFieldHint
  }

  get emailFieldLabel(): string | undefined {
    return this.fields.emailFieldLabel
  }

  get email_field_label(): string | undefined {
    return this.fields.emailFieldLabel
  }

  get studentEmailFieldHint(): string | undefined {
    return this.fields.studentEmailFieldHint
  }

  get student_email_field_hint(): string | undefined {
    return this.fields.studentEmailFieldHint
  }

  get subjectFieldLabel(): string | undefined {
    return this.fields.subjectFieldLabel
  }

  get subject_field_label(): string | undefined {
    return this.fields.subjectFieldLabel
  }

  get subjectFieldHint(): string | undefined {
    return this.fields.subjectFieldHint
  }

  get subject_field_hint(): string | undefined {
    return this.fields.subjectFieldHint
  }

  get messageFieldLabel(): string | undefined {
    return this.fields.messageFieldLabel
  }

  get message_field_label(): string | undefined {
    return this.fields.messageFieldLabel
  }

  get messageFieldHint(): string | undefined {
    return this.fields.messageFieldHint
  }

  get message_field_hint(): string | undefined {
    return this.fields.messageFieldHint
  }

  get messageFieldSuggestions(): string[] | undefined {
    return this.fields.messageFieldSuggestions
  }

  get message_field_suggestions(): string[] | undefined {
    return this.fields.messageFieldSuggestions
  }

  get submitLabel(): string | undefined {
    return this.fields.submitLabel
  }

  get submit_label(): string | undefined {
    return this.fields.submitLabel
  }

  get successfulSendMessageHeader(): string | undefined {
    return this.fields.successfulSendMessageHeader
  }

  get successful_send_message_header(): string | undefined {
    return this.fields.successfulSendMessageHeader
  }

  get successfulSendMessageBody(): string | undefined {
    return this.fields.successfulSendMessageBody
  }

  get successful_send_message_body(): string | undefined {
    return this.fields.successfulSendMessageBody
  }

  get failedSendMessageHeader(): string | undefined {
    return this.fields.failedSendMessageHeader
  }

  get failed_send_message_header(): string | undefined {
    return this.fields.failedSendMessageHeader
  }

  get failedSendMessageBody(): string | undefined {
    return this.fields.failedSendMessageBody
  }

  get failed_send_message_body(): string | undefined {
    return this.fields.failedSendMessageBody
  }

  constructor(entry: IEmailFormContent);
  constructor(id: string, fields: IEmailFormContentFields);
  constructor(entryOrId: IEmailFormContent | string, fields?: IEmailFormContentFields) {
    super(entryOrId, 'emailFormContent', fields)
  }
}
