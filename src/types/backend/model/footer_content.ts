import { wrap } from ".";
import { Asset, Entry, IAsset, IEntry, ILink, isAsset, isEntry, ISys } from "../base";
import { IPageLink, PageLink } from "./page_link";
import { IUrl, Url } from "./url";

export interface IFooterContentFields {
  footerPeople?: ILink<'Asset'> | IAsset;
  monumUrl?: ILink<'Entry'> | IUrl;
  monumImage?: ILink<'Asset'> | IAsset;
  pageLinks?: Array<ILink<'Entry'> | IPageLink>;
  links?: Array<ILink<'Entry'> | IUrl>;
  contactLabel?: string;
  contactEmail?: string;
}

/**
 * Footer Content
 */
export interface IFooterContent extends IEntry<IFooterContentFields> {
}

export function isFooterContent(entry: IEntry<any>): entry is IFooterContent {
  return entry &&
    entry.sys &&
    entry.sys.contentType &&
    entry.sys.contentType.sys &&
    entry.sys.contentType.sys.id === 'footerContent'
}

export class FooterContent extends Entry<IFooterContentFields> implements IFooterContent {
  public readonly sys!: ISys<'Entry'>;
  public readonly fields!: IFooterContentFields;

  get footerPeople(): Asset | null | undefined {
    return !this.fields.footerPeople ? undefined :
      (isAsset(this.fields.footerPeople) ? new Asset(this.fields.footerPeople) : null)
  }

  get footer_people(): Asset | null | undefined {
    return !this.fields.footerPeople ? undefined :
      (isAsset(this.fields.footerPeople) ? new Asset(this.fields.footerPeople) : null)
  }

  get monumUrl(): Url | null | undefined {
    return !this.fields.monumUrl ? undefined :
      (isEntry(this.fields.monumUrl) ? wrap<'url'>(this.fields.monumUrl) : null)
  }

  get monum_url(): Url | null | undefined {
    return !this.fields.monumUrl ? undefined :
      (isEntry(this.fields.monumUrl) ? wrap<'url'>(this.fields.monumUrl) : null)
  }

  get monumImage(): Asset | null | undefined {
    return !this.fields.monumImage ? undefined :
      (isAsset(this.fields.monumImage) ? new Asset(this.fields.monumImage) : null)
  }

  get monum_image(): Asset | null | undefined {
    return !this.fields.monumImage ? undefined :
      (isAsset(this.fields.monumImage) ? new Asset(this.fields.monumImage) : null)
  }

  get pageLinks(): Array<PageLink | null> | undefined {
    return !this.fields.pageLinks ? undefined :
      this.fields.pageLinks.map((item) =>
        isEntry(item) ? wrap<'pageLink'>(item) : null
      )
  }

  get page_links(): Array<PageLink | null> | undefined {
    return !this.fields.pageLinks ? undefined :
      this.fields.pageLinks.map((item) =>
        isEntry(item) ? wrap<'pageLink'>(item) : null
      )
  }

  get links(): Array<Url | null> | undefined {
    return !this.fields.links ? undefined :
      this.fields.links.map((item) =>
        isEntry(item) ? wrap<'url'>(item) : null
      )
  }

  get contactLabel(): string | undefined {
    return this.fields.contactLabel
  }

  get contact_label(): string | undefined {
    return this.fields.contactLabel
  }

  get contactEmail(): string | undefined {
    return this.fields.contactEmail
  }

  get contact_email(): string | undefined {
    return this.fields.contactEmail
  }

  constructor(entry: IFooterContent);
  constructor(id: string, fields: IFooterContentFields);
  constructor(entryOrId: IFooterContent | string, fields?: IFooterContentFields) {
    super(entryOrId, 'footerContent', fields)
  }
}
