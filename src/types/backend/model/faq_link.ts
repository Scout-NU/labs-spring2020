import { Entry, IEntry, ISys } from "../base";

export interface IFaqLinkFields {
  linkDisplayText?: string;
  linkUrl?: string;
  linkDescriptino?: string;
}

/**
 * FAQLink
 * One of a group of links that may be associated with an FAQ.
 */
export interface IFaqLink extends IEntry<IFaqLinkFields> {
}

export function isFaqLink(entry: IEntry<any>): entry is IFaqLink {
  return entry &&
    entry.sys &&
    entry.sys.contentType &&
    entry.sys.contentType.sys &&
    entry.sys.contentType.sys.id === 'faqLink'
}

export class FaqLink extends Entry<IFaqLinkFields> implements IFaqLink {
  public readonly sys!: ISys<'Entry'>;
  public readonly fields!: IFaqLinkFields;

  get linkDisplayText(): string | undefined {
    return this.fields.linkDisplayText
  }

  get link_display_text(): string | undefined {
    return this.fields.linkDisplayText
  }

  get linkUrl(): string | undefined {
    return this.fields.linkUrl
  }

  get link_url(): string | undefined {
    return this.fields.linkUrl
  }

  get linkDescriptino(): string | undefined {
    return this.fields.linkDescriptino
  }

  get link_descriptino(): string | undefined {
    return this.fields.linkDescriptino
  }

  constructor(entry: IFaqLink);
  constructor(id: string, fields: IFaqLinkFields);
  constructor(entryOrId: IFaqLink | string, fields?: IFaqLinkFields) {
    super(entryOrId, 'faqLink', fields)
  }
}
