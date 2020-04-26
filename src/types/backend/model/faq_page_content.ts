import { wrap } from ".";
import { Entry, IEntry, ILink, isEntry, ISys } from "../base";
import { Faq, IFaq } from "./faq";
import { PageDiscriminator } from "./page";

export interface IFaqPageContentFields {
  pageHeader?: string;
  furtherQuestionHeader?: string;
  furtherHelpHeader?: string;
  furtherHelpEmail?: string;
  faQs?: Array<ILink<'Entry'> | IFaq>;
}

/**
 * FAQ Page Content
 */
export interface IFaqPageContent extends IEntry<IFaqPageContentFields> {
  kind: PageDiscriminator.FAQ;
}

export function isFaqPageContent(entry: IEntry<any>): entry is IFaqPageContent {
  return entry &&
    entry.sys &&
    entry.sys.contentType &&
    entry.sys.contentType.sys &&
    entry.sys.contentType.sys.id == 'faqPageContent'
}

// export class FaqPageContent extends Entry<IFaqPageContentFields> implements IFaqPageContent {
//   public readonly sys!: ISys<'Entry'>;
//   public readonly fields!: IFaqPageContentFields;

//   get pageHeader(): string | undefined {
//     return this.fields.pageHeader
//   }

//   get page_header(): string | undefined {
//     return this.fields.pageHeader
//   }

//   get furtherQuestionHeader(): string | undefined {
//     return this.fields.furtherQuestionHeader
//   }

//   get further_question_header(): string | undefined {
//     return this.fields.furtherQuestionHeader
//   }

//   get furtherHelpHeader(): string | undefined {
//     return this.fields.furtherHelpHeader
//   }

//   get further_help_header(): string | undefined {
//     return this.fields.furtherHelpHeader
//   }

//   get furtherHelpEmail(): string | undefined {
//     return this.fields.furtherHelpEmail
//   }

//   get further_help_email(): string | undefined {
//     return this.fields.furtherHelpEmail
//   }

//   get faQs(): Array<Faq | null> | undefined {
//     return !this.fields.faQs ? undefined :
//       this.fields.faQs.map((item) =>
//         isEntry(item) ? wrap<'faq'>(item) : null
//       )
//   }

//   get fa_qs(): Array<Faq | null> | undefined {
//     return !this.fields.faQs ? undefined :
//       this.fields.faQs.map((item) =>
//         isEntry(item) ? wrap<'faq'>(item) : null
//       )
//   }

//   constructor(entry: IFaqPageContent);
//   constructor(id: string, fields: IFaqPageContentFields);
//   constructor(entryOrId: IFaqPageContent | string, fields?: IFaqPageContentFields) {
//     super(entryOrId, 'faqPageContent', fields)
//   }
// }
