import { wrap } from ".";
import { Entry, IEntry, ILink, isEntry, ISys } from "../base";
import { IPageLink, PageLink } from "./page_link";

export interface IHeaderContentFields {
  links?: Array<ILink<'Entry'> | IPageLink>;
}

/**
 * Header Content
 */
export interface IHeaderContent extends IEntry<IHeaderContentFields> {
}

export function isHeaderContent(entry: IEntry<any>): entry is IHeaderContent {
  return entry &&
    entry.sys &&
    entry.sys.contentType &&
    entry.sys.contentType.sys &&
    entry.sys.contentType.sys.id == 'headerContent'
}

export class HeaderContent extends Entry<IHeaderContentFields> implements IHeaderContent {
  public readonly sys!: ISys<'Entry'>;
  public readonly fields!: IHeaderContentFields;

  get links(): Array<PageLink | null> | undefined {
    return !this.fields.links ? undefined :
      this.fields.links.map((item) =>
        isEntry(item) ? wrap<'pageLink'>(item) : null
      )
  }

  constructor(entry: IHeaderContent);
  constructor(id: string, fields: IHeaderContentFields);
  constructor(entryOrId: IHeaderContent | string, fields?: IHeaderContentFields) {
    super(entryOrId, 'headerContent', fields)
  }
}
