import * as C from ".";
import { IEntry } from "../base";

export * from "./department";
export * from "./problem_tag";
export * from "./department_project";
export * from "./ambassador";

export interface TypeDirectory {
  'department': C.IDepartment;
  'problemTag': C.IProblemTag;
  'departmentProject': C.IDepartmentProject;
  'ambassador': C.IAmbassador;
}

export interface ClassDirectory {
  'department': C.Department;
  'problemTag': C.ProblemTag;
  'departmentProject': C.DepartmentProject;
  'ambassador': C.Ambassador;
}

export function wrap(entry: C.IDepartment): C.Department;
export function wrap(entry: C.IProblemTag): C.ProblemTag;
export function wrap(entry: C.IDepartmentProject): C.DepartmentProject;
export function wrap(entry: C.IAmbassador): C.Ambassador;
export function wrap<CT extends keyof TypeDirectory>(entry: TypeDirectory[CT]): ClassDirectory[CT];
export function wrap(entry: IEntry<any>): IEntry<any> {
  const id = entry.sys.contentType.sys.id
  switch (id) {
    case 'department':
      return new C.Department(entry)
    case 'problemTag':
      return new C.ProblemTag(entry)
    case 'departmentProject':
      return new C.DepartmentProject(entry)
    case 'ambassador':
      return new C.Ambassador(entry)
    default:
      throw new Error('Unknown content type:' + id)
  }
}
