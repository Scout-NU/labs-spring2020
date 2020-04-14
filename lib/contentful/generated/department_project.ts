import { wrap } from ".";
import { Asset, Entry, IAsset, IEntry, ILink, isAsset, isEntry, ISys } from "../base";
import { Department, IDepartment } from "./department";

export interface IDepartmentProjectFields {
  department?: ILink<'Entry'> | IDepartment;
  title?: string;
  description?: string;
  projectImage?: ILink<'Asset'> | IAsset;
}

/**
 * Department Project
 */
export interface IDepartmentProject extends IEntry<IDepartmentProjectFields> {
}

export function isDepartmentProject(entry: IEntry<any>): entry is IDepartmentProject {
  return entry &&
    entry.sys &&
    entry.sys.contentType &&
    entry.sys.contentType.sys &&
    entry.sys.contentType.sys.id == 'departmentProject'
}

export class DepartmentProject extends Entry<IDepartmentProjectFields> implements IDepartmentProject {
  public readonly sys!: ISys<'Entry'>;
  public readonly fields!: IDepartmentProjectFields;

  get department(): Department | null | undefined {
    return !this.fields.department ? undefined :
      (isEntry(this.fields.department) ? wrap<'department'>(this.fields.department) : null)
  }

  get title(): string | undefined {
    return this.fields.title
  }

  get description(): string | undefined {
    return this.fields.description
  }

  get projectImage(): Asset | null | undefined {
    return !this.fields.projectImage ? undefined :
      (isAsset(this.fields.projectImage) ? new Asset(this.fields.projectImage) : null)
  }

  get project_image(): Asset | null | undefined {
    return !this.fields.projectImage ? undefined :
      (isAsset(this.fields.projectImage) ? new Asset(this.fields.projectImage) : null)
  }

  constructor(entry: IDepartmentProject);
  constructor(id: string, fields: IDepartmentProjectFields);
  constructor(entryOrId: IDepartmentProject | string, fields?: IDepartmentProjectFields) {
    super(entryOrId, 'departmentProject', fields)
  }
}
