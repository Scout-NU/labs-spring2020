import { Asset, Entry, IAsset, IEntry, ILink, isAsset, ISys } from "../base";

export interface ICommunicationStepFields {
  stepPicture?: ILink<'Asset'> | IAsset;
  stepTitle?: string;
  stepDescription?: string;
}

/**
 * Communication Step
 * This represents one of the steps displayed in the process of communicating with someone using the site. As of 4/24, these are displayed on the Home Page of the site.
 */
export interface ICommunicationStep extends IEntry<ICommunicationStepFields> {
}

export function isCommunicationStep(entry: IEntry<any>): entry is ICommunicationStep {
  return entry &&
    entry.sys &&
    entry.sys.contentType &&
    entry.sys.contentType.sys &&
    entry.sys.contentType.sys.id == 'communicationStep'
}

export class CommunicationStep extends Entry<ICommunicationStepFields> implements ICommunicationStep {
  public readonly sys!: ISys<'Entry'>;
  public readonly fields!: ICommunicationStepFields;

  get stepPicture(): Asset | null | undefined {
    return !this.fields.stepPicture ? undefined :
      (isAsset(this.fields.stepPicture) ? new Asset(this.fields.stepPicture) : null)
  }

  get step_picture(): Asset | null | undefined {
    return !this.fields.stepPicture ? undefined :
      (isAsset(this.fields.stepPicture) ? new Asset(this.fields.stepPicture) : null)
  }

  get stepTitle(): string | undefined {
    return this.fields.stepTitle
  }

  get step_title(): string | undefined {
    return this.fields.stepTitle
  }

  get stepDescription(): string | undefined {
    return this.fields.stepDescription
  }

  get step_description(): string | undefined {
    return this.fields.stepDescription
  }

  constructor(entry: ICommunicationStep);
  constructor(id: string, fields: ICommunicationStepFields);
  constructor(entryOrId: ICommunicationStep | string, fields?: ICommunicationStepFields) {
    super(entryOrId, 'communicationStep', fields)
  }
}
