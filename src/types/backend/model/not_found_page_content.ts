import { wrap } from ".";
import { Asset, Entry, IAsset, IEntry, ILink, isAsset, isEntry, ISys } from "../base";
import { IPageLink, PageLink } from "./page_link";

export interface INotFoundPageContentFields {
  pageHeader?: string;
  pageSubheader?: string;
  helpfulMessage?: string;
  redirectLink?: ILink<'Entry'> | IPageLink;
  decoration?: ILink<'Asset'> | IAsset;
}


/**
 * 404 Page Content
 */
export interface INotFoundPageContent extends IEntry<INotFoundPageContentFields> {
}

export function isNotFoundPageContent(entry: IEntry<any>): entry is INotFoundPageContent {
  return entry &&
    entry.sys &&
    entry.sys.contentType &&
    entry.sys.contentType.sys &&
    entry.sys.contentType.sys.id == 'notFoundPageContent'
}

export class NotFoundPageContent extends Entry<INotFoundPageContentFields> implements INotFoundPageContent {
  public readonly sys!: ISys<'Entry'>;
  public readonly fields!: INotFoundPageContentFields;


  get kind(): string {
    return this.kind;
  }

  get pageHeader(): string | undefined {
    return this.fields.pageHeader
  }

  get page_header(): string | undefined {
    return this.fields.pageHeader
  }

  get pageSubheader(): string | undefined {
    return this.fields.pageSubheader
  }

  get page_subheader(): string | undefined {
    return this.fields.pageSubheader
  }

  get helpfulMessage(): string | undefined {
    return this.fields.helpfulMessage
  }

  get helpful_message(): string | undefined {
    return this.fields.helpfulMessage
  }

  get redirectLink(): PageLink | null | undefined {
    return !this.fields.redirectLink ? undefined :
      (isEntry(this.fields.redirectLink) ? wrap<'pageLink'>(this.fields.redirectLink) : null)
  }

  get redirect_link(): PageLink | null | undefined {
    return !this.fields.redirectLink ? undefined :
      (isEntry(this.fields.redirectLink) ? wrap<'pageLink'>(this.fields.redirectLink) : null)
  }

  get decoration(): Asset | null | undefined {
    return !this.fields.decoration ? undefined :
      (isAsset(this.fields.decoration) ? new Asset(this.fields.decoration) : null)
  }

  constructor(entry: INotFoundPageContent);
  constructor(id: string, fields: INotFoundPageContentFields);
  constructor(entryOrId: INotFoundPageContent | string, fields?: INotFoundPageContentFields) {
    super(entryOrId, 'notFoundPageContent', fields)
  }
}
