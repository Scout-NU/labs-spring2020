import * as C from ".";
import { IEntry } from "../base";

export * from "./ambassador";
export * from "./department";
export * from "./problem_tag";
export * from "./department_project";
export * from "./form";
export * from "./ambassador_project_association";

export interface TypeDirectory {
  'ambassador': C.IAmbassador;
  'department': C.IDepartment;
  'problemTag': C.IProblemTag;
  'departmentProject': C.IDepartmentProject;
  'form': C.IForm;
  'ambassadorProjectAssociation': C.IAmbassadorProjectAssociation;
}

export interface ClassDirectory {
  'ambassador': C.Ambassador;
  'department': C.Department;
  'problemTag': C.ProblemTag;
  'departmentProject': C.DepartmentProject;
  'form': C.Form;
  'ambassadorProjectAssociation': C.AmbassadorProjectAssociation;
}

export function wrap(entry: C.IAmbassador): C.Ambassador;
export function wrap(entry: C.IDepartment): C.Department;
export function wrap(entry: C.IProblemTag): C.ProblemTag;
export function wrap(entry: C.IDepartmentProject): C.DepartmentProject;
export function wrap(entry: C.IForm): C.Form;
export function wrap(entry: C.IAmbassadorProjectAssociation): C.AmbassadorProjectAssociation;
export function wrap<CT extends keyof TypeDirectory>(entry: TypeDirectory[CT]): ClassDirectory[CT];
export function wrap(entry: IEntry<any>): IEntry<any> {
  const id = entry.sys.contentType.sys.id
  switch (id) {
    case 'ambassador':
      return new C.Ambassador(entry)
    case 'department':
      return new C.Department(entry)
    case 'problemTag':
      return new C.ProblemTag(entry)
    case 'departmentProject':
      return new C.DepartmentProject(entry)
    case 'form':
      return new C.Form(entry)
    case 'ambassadorProjectAssociation':
      return new C.AmbassadorProjectAssociation(entry)
    default:
      throw new Error('Unknown content type:' + id)
  }
}
