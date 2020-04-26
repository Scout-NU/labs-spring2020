import { Entry, IEntry, ISys } from "../base";

export interface IUrlFields {
  urlDisplayText: string;
  urlDestination: string;
}

/**
 * URL
 */
export interface IUrl extends IEntry<IUrlFields> {
}

export function isUrl(entry: IEntry<any>): entry is IUrl {
  return entry &&
    entry.sys &&
    entry.sys.contentType &&
    entry.sys.contentType.sys &&
    entry.sys.contentType.sys.id == 'url'
}

export class Url extends Entry<IUrlFields> implements IUrl {
  public readonly sys!: ISys<'Entry'>;
  public readonly fields!: IUrlFields;

  get urlDisplayText(): string {
    return this.fields.urlDisplayText
  }

  get url_display_text(): string {
    return this.fields.urlDisplayText
  }

  get urlDestination(): string {
    return this.fields.urlDestination
  }

  get url_destination(): string {
    return this.fields.urlDestination
  }

  constructor(entry: IUrl);
  constructor(id: string, fields: IUrlFields);
  constructor(entryOrId: IUrl | string, fields?: IUrlFields) {
    super(entryOrId, 'url', fields)
  }
}
