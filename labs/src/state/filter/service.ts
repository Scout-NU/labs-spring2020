import IFilter from "../../types/cms/generated/filter";
import getProblemTagService from "../problem-tags/service";
import getDepartmentService from "../department/service";
import { IProblemTag } from "../../types/cms/generated";
import { IDepartment } from "../../types/cms/generated";

export interface IFilterService {
    getAllFilters(): Promise<IFilter[]>;
}

export default function useFilterService(): IFilterService {
    return {
        getAllFilters: getAllFilters,
    }
}

// TODO: if one of these fails, does everything fail?
async function getAllFilters(): Promise<IFilter[]> {
    let tagService = getProblemTagService();
    let departmentService = getDepartmentService();
    let [tags, departments] = await Promise.all([tagService.getAllProblemTags(), departmentService.getAllDepartments()]);
    return [resolveTagFilters(tags), resolveDepartmentFilters(departments)]
}

const resolveTagFilters = (items: IProblemTag[]): IFilter => {
    let filterOptions: string[] = []
    items.forEach((item) => { if (item.fields.tagName) filterOptions.push(item.fields.tagName) })
    return {
        filterCategory: 'Topics',
        filterLabels: filterOptions,
    };
}

const resolveDepartmentFilters = (items: IDepartment[]): IFilter => {
    let filterOptions: string[] = []
    items.forEach((item) => { if (item.fields.departmentName) filterOptions.push(item.fields.departmentName)})
    return {
        filterCategory: 'Departments',
        filterLabels: filterOptions,
    };
}