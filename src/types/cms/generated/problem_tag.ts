import { Entry, IEntry, ISys } from "../base";

export interface IProblemTagFields {
  tagName?: string;
}

/**
 * Problem Tag
 * An issue that an ambassador may have expertise on.
 */
export interface IProblemTag extends IEntry<IProblemTagFields> {
}

export function isProblemTag(entry: IEntry<any>): entry is IProblemTag {
  return entry &&
    entry.sys &&
    entry.sys.contentType &&
    entry.sys.contentType.sys &&
    entry.sys.contentType.sys.id === 'problemTag'
}

export class ProblemTag extends Entry<IProblemTagFields> implements IProblemTag {
  public readonly sys!: ISys<'Entry'>;
  public readonly fields!: IProblemTagFields;

  get tagName(): string | undefined {
    return this.fields.tagName
  }

  get tag_name(): string | undefined {
    return this.fields.tagName
  }

  constructor(entry: IProblemTag);
  constructor(id: string, fields: IProblemTagFields);
  constructor(entryOrId: IProblemTag | string, fields?: IProblemTagFields) {
    super(entryOrId, 'problemTag', fields)
  }
}
