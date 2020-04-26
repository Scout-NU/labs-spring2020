import { Entry, IEntry, ISys } from "../base";

export interface IConnectionStepFields {
  stepTitle?: string;
  stepDetails?: string[];
}

/**
 * Detailed Communication Step
 * A detailed step in the process of communicating with an ambassador. As of 4/24, used in the Communication Guide Page.
 */
export interface IConnectionStep extends IEntry<IConnectionStepFields> {
}

export function isConnectionStep(entry: IEntry<any>): entry is IConnectionStep {
  return entry &&
    entry.sys &&
    entry.sys.contentType &&
    entry.sys.contentType.sys &&
    entry.sys.contentType.sys.id == 'connectionStep'
}

export class ConnectionStep extends Entry<IConnectionStepFields> implements IConnectionStep {
  public readonly sys!: ISys<'Entry'>;
  public readonly fields!: IConnectionStepFields;

  get stepTitle(): string | undefined {
    return this.fields.stepTitle
  }

  get step_title(): string | undefined {
    return this.fields.stepTitle
  }

  get stepDetails(): string[] | undefined {
    return this.fields.stepDetails
  }

  get step_details(): string[] | undefined {
    return this.fields.stepDetails
  }

  constructor(entry: IConnectionStep);
  constructor(id: string, fields: IConnectionStepFields);
  constructor(entryOrId: IConnectionStep | string, fields?: IConnectionStepFields) {
    super(entryOrId, 'connectionStep', fields)
  }
}
