import { Asset, Entry, IAsset, IEntry, ILink, isAsset, ISys } from "../base";

export interface IDepartmentFields {
  departmentUrl?: string;
  departmentName?: string;
  departmentImage?: ILink<'Asset'> | IAsset;
}

/**
 * Department
 */
export interface IDepartment extends IEntry<IDepartmentFields> {
}

export function isDepartment(entry: IEntry<any>): entry is IDepartment {
  return entry &&
    entry.sys &&
    entry.sys.contentType &&
    entry.sys.contentType.sys &&
    entry.sys.contentType.sys.id === 'department'
}

export class Department extends Entry<IDepartmentFields> implements IDepartment {
  public readonly sys!: ISys<'Entry'>;
  public readonly fields!: IDepartmentFields;

  get departmentUrl(): string | undefined {
    return this.fields.departmentUrl
  }

  get department_url(): string | undefined {
    return this.fields.departmentUrl
  }

  get departmentName(): string | undefined {
    return this.fields.departmentName
  }

  get department_name(): string | undefined {
    return this.fields.departmentName
  }

  get departmentImage(): Asset | null | undefined {
    return !this.fields.departmentImage ? undefined :
      (isAsset(this.fields.departmentImage) ? new Asset(this.fields.departmentImage) : null)
  }

  get department_image(): Asset | null | undefined {
    return !this.fields.departmentImage ? undefined :
      (isAsset(this.fields.departmentImage) ? new Asset(this.fields.departmentImage) : null)
  }

  constructor(entry: IDepartment);
  constructor(id: string, fields: IDepartmentFields);
  constructor(entryOrId: IDepartment | string, fields?: IDepartmentFields) {
    super(entryOrId, 'department', fields)
  }
}
