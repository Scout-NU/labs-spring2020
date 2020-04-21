import { wrap } from ".";
import { Entry, IEntry, ILink, isEntry, ISys } from "../base";
import { DepartmentProject, IDepartmentProject } from "./department_project";

export interface IAmbassadorProjectAssociationFields {
  departmentProject: ILink<'Entry'> | IDepartmentProject;
  ambassadorNotes: string;
}

/**
 * AmbassadorProjectAssociation
 */
export interface IAmbassadorProjectAssociation extends IEntry<IAmbassadorProjectAssociationFields> {
}

export function isAmbassadorProjectAssociation(entry: IEntry<any>): entry is IAmbassadorProjectAssociation {
  return entry &&
    entry.sys &&
    entry.sys.contentType &&
    entry.sys.contentType.sys &&
    entry.sys.contentType.sys.id == 'ambassadorProjectAssociation'
}

export class AmbassadorProjectAssociation extends Entry<IAmbassadorProjectAssociationFields> implements IAmbassadorProjectAssociation {
  public readonly sys!: ISys<'Entry'>;
  public readonly fields!: IAmbassadorProjectAssociationFields;

  get departmentProject(): DepartmentProject | null {
    return (isEntry(this.fields.departmentProject) ? wrap<'departmentProject'>(this.fields.departmentProject) : null)
  }

  get department_project(): DepartmentProject | null {
    return (isEntry(this.fields.departmentProject) ? wrap<'departmentProject'>(this.fields.departmentProject) : null)
  }

  get ambassadorNotes(): string {
    return this.fields.ambassadorNotes
  }

  get ambassador_notes(): string {
    return this.fields.ambassadorNotes
  }

  constructor(entry: IAmbassadorProjectAssociation);
  constructor(id: string, fields: IAmbassadorProjectAssociationFields);
  constructor(entryOrId: IAmbassadorProjectAssociation | string, fields?: IAmbassadorProjectAssociationFields) {
    super(entryOrId, 'ambassadorProjectAssociation', fields)
  }
}
