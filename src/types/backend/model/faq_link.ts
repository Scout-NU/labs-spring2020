import { Entry, IEntry, ISys } from "../base";

export interface ICmsFaqLinkFields {
  linkDisplayText?: string;
  linkUrl?: string;
  linkDescriptino?: string;
}

/**
 * FAQLink
 * One of a group of links that may be associated with an FAQ.
 */
export interface ICmsFaqLink extends IEntry<ICmsFaqLinkFields> {
}

export function isFaqLink(entry: IEntry<any>): entry is ICmsFaqLink {
  return entry &&
    entry.sys &&
    entry.sys.contentType &&
    entry.sys.contentType.sys &&
    entry.sys.contentType.sys.id === 'faqLink'
}

export class CmsFaqLink extends Entry<ICmsFaqLinkFields> implements ICmsFaqLink {
  public readonly sys!: ISys<'Entry'>;
  public readonly fields!: ICmsFaqLinkFields;

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

  constructor(entry: ICmsFaqLink);
  constructor(id: string, fields: ICmsFaqLinkFields);
  constructor(entryOrId: ICmsFaqLink | string, fields?: ICmsFaqLinkFields) {
    super(entryOrId, 'cmsFaqLink', fields)
  }
}
