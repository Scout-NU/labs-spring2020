import { wrap } from ".";
import { Entry, IEntry, ILink, isEntry, ISys } from "../base";
import { CmsFaqLink, ICmsFaqLink } from "./faq_link";

export interface ICmsFaqFields {
  title?: string;
  suggestions?: string[];
  description?: string;
  links?: Array<ILink<'Entry'> | ICmsFaqLink>;
}

/**
 * FAQ
 */
export interface ICmsFaq extends IEntry<ICmsFaqFields> {
}

export function isFaq(entry: IEntry<any>): entry is ICmsFaq {
  return entry &&
    entry.sys &&
    entry.sys.contentType &&
    entry.sys.contentType.sys &&
    entry.sys.contentType.sys.id === 'faq'
}

export class CmsFaq extends Entry<ICmsFaqFields> implements ICmsFaq {
  public readonly sys!: ISys<'Entry'>;
  public readonly fields!: ICmsFaqFields;

  get title(): string | undefined {
    return this.fields.title
  }

  get suggestions(): string[] | undefined {
    return this.fields.suggestions
  }

  get description(): string | undefined {
    return this.fields.description
  }

  get links(): Array<CmsFaqLink | null> | undefined {
    return !this.fields.links ? undefined :
      this.fields.links.map((item) =>
        isEntry(item) ? wrap<'cmsFaqLink'>(item) : null
      )
  }

  constructor(entry: ICmsFaq);
  constructor(id: string, fields: ICmsFaqFields);
  constructor(entryOrId: ICmsFaq | string, fields?: ICmsFaqFields) {
    super(entryOrId, 'faq', fields)
  }
}
