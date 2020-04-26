import { wrap } from ".";
import { Asset, Entry, IAsset, IEntry, ILink, isAsset, isEntry, ISys } from "../base";
import { ConnectionStep, IConnectionStep } from "./connection_step";

export interface IConnectionGuideContentFields {
  pageHeader?: string;
  pageSubheader?: string;
  headerDecoration?: ILink<'Asset'> | IAsset;
  remindersIcon?: ILink<'Asset'> | IAsset;
  remindersHeader?: string;
  reminders?: string[];
  connectionSteps?: Array<ILink<'Entry'> | IConnectionStep>;
}

/**
 * Communication Guide Content
 */
export interface IConnectionGuideContent extends IEntry<IConnectionGuideContentFields> {
}

export function isConnectionGuideContent(entry: IEntry<any>): entry is IConnectionGuideContent {
  return entry &&
    entry.sys &&
    entry.sys.contentType &&
    entry.sys.contentType.sys &&
    entry.sys.contentType.sys.id == 'connectionGuideContent'
}

export class ConnectionGuideContent extends Entry<IConnectionGuideContentFields> implements IConnectionGuideContent {
  public readonly sys!: ISys<'Entry'>;
  public readonly fields!: IConnectionGuideContentFields;

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

  get headerDecoration(): Asset | null | undefined {
    return !this.fields.headerDecoration ? undefined :
      (isAsset(this.fields.headerDecoration) ? new Asset(this.fields.headerDecoration) : null)
  }

  get header_decoration(): Asset | null | undefined {
    return !this.fields.headerDecoration ? undefined :
      (isAsset(this.fields.headerDecoration) ? new Asset(this.fields.headerDecoration) : null)
  }

  get remindersIcon(): Asset | null | undefined {
    return !this.fields.remindersIcon ? undefined :
      (isAsset(this.fields.remindersIcon) ? new Asset(this.fields.remindersIcon) : null)
  }

  get reminders_icon(): Asset | null | undefined {
    return !this.fields.remindersIcon ? undefined :
      (isAsset(this.fields.remindersIcon) ? new Asset(this.fields.remindersIcon) : null)
  }

  get remindersHeader(): string | undefined {
    return this.fields.remindersHeader
  }

  get reminders_header(): string | undefined {
    return this.fields.remindersHeader
  }

  get reminders(): string[] | undefined {
    return this.fields.reminders
  }

  get connectionSteps(): Array<ConnectionStep | null> | undefined {
    return !this.fields.connectionSteps ? undefined :
      this.fields.connectionSteps.map((item) =>
        isEntry(item) ? wrap<'connectionStep'>(item) : null
      )
  }

  get connection_steps(): Array<ConnectionStep | null> | undefined {
    return !this.fields.connectionSteps ? undefined :
      this.fields.connectionSteps.map((item) =>
        isEntry(item) ? wrap<'connectionStep'>(item) : null
      )
  }

  constructor(entry: IConnectionGuideContent);
  constructor(id: string, fields: IConnectionGuideContentFields);
  constructor(entryOrId: IConnectionGuideContent | string, fields?: IConnectionGuideContentFields) {
    super(entryOrId, 'connectionGuideContent', fields)
  }
}
