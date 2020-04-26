import { wrap } from ".";
import { Entry, IEntry, ILink, isEntry, ISys } from "../base";
import { FaqLink, IFaqLink } from "./faq_link";

export interface IFaqFields {
  title?: string;
  suggestions?: string[];
  description?: string;
  links?: Array<ILink<'Entry'> | IFaqLink>;
}

/**
 * FAQ
 */
export interface IFaq extends IEntry<IFaqFields> {
}

export function isFaq(entry: IEntry<any>): entry is IFaq {
  return entry &&
    entry.sys &&
    entry.sys.contentType &&
    entry.sys.contentType.sys &&
    entry.sys.contentType.sys.id == 'faq'
}

export class Faq extends Entry<IFaqFields> implements IFaq {
  public readonly sys!: ISys<'Entry'>;
  public readonly fields!: IFaqFields;

  get title(): string | undefined {
    return this.fields.title
  }

  get suggestions(): string[] | undefined {
    return this.fields.suggestions
  }

  get description(): string | undefined {
    return this.fields.description
  }

  get links(): Array<FaqLink | null> | undefined {
    return !this.fields.links ? undefined :
      this.fields.links.map((item) =>
        isEntry(item) ? wrap<'faqLink'>(item) : null
      )
  }

  constructor(entry: IFaq);
  constructor(id: string, fields: IFaqFields);
  constructor(entryOrId: IFaq | string, fields?: IFaqFields) {
    super(entryOrId, 'faq', fields)
  }
}
