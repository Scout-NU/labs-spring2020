import { wrap } from ".";
import { Entry, IEntry, ILink, isEntry, ISys } from "../base";
import { IPage, Page } from "./page";

export interface IPageLinkFields {
  page?: ILink<'Entry'> | IPage;
  linkDisplayText?: string;
}

/**
 * Page Link
 * A special URL specifically for going to pages on the site.
 */
export interface IPageLink extends IEntry<IPageLinkFields> {
}

export function isPageLink(entry: IEntry<any>): entry is IPageLink {
  return entry &&
    entry.sys &&
    entry.sys.contentType &&
    entry.sys.contentType.sys &&
    entry.sys.contentType.sys.id === 'pageLink'
}

export class PageLink extends Entry<IPageLinkFields> implements IPageLink {
  public readonly sys!: ISys<'Entry'>;
  public readonly fields!: IPageLinkFields;

  get page(): Page | null | undefined {
    return !this.fields.page ? undefined :
      (isEntry(this.fields.page) ? wrap<'page'>(this.fields.page) : null)
  }

  get linkDisplayText(): string | undefined {
    return this.fields.linkDisplayText
  }

  get link_display_text(): string | undefined {
    return this.fields.linkDisplayText
  }

  constructor(entry: IPageLink);
  constructor(id: string, fields: IPageLinkFields);
  constructor(entryOrId: IPageLink | string, fields?: IPageLinkFields) {
    super(entryOrId, 'pageLink', fields)
  }
}
