import IFilter from "../../types/backend/model/filter";
import { IProblemTag } from "../../types/backend/model";
import { IDepartment } from "../../types/backend/model";
import DepartmentService from "../department/service";
import ProblemTagService from "../problem-tags/service";

export interface IFilterService {
    getAllFilters(): Promise<IFilter[]>;
}

/**
 * This service is responsible for fetching the filters.
 * REFACTOR: this class should eventually go away as filters are part of SearchPageContent. 
 */
export default class FilterService implements IFilterService { 
        // TODO: if one of these fails, does everything fail?
    async getAllFilters(): Promise<IFilter[]> {
        let tagService = new ProblemTagService();
        let departmentService = new DepartmentService();
        let [tags, departments] = await Promise.all([tagService.getAllProblemTags(), departmentService.getAllDepartments()]);
        return [this.resolveTagFilters(tags), this.resolveDepartmentFilters(departments)]
    }

    private resolveTagFilters(items: IProblemTag[]): IFilter {
        let filterOptions: string[] = []
        items.forEach((item) => { if (item.fields.tagName) filterOptions.push(item.fields.tagName) })
        return {
            filterCategory: 'Topics',
            filterLabels: filterOptions,
        };
    }

    private resolveDepartmentFilters(items: IDepartment[]): IFilter {
        let filterOptions: string[] = []
        items.forEach((item) => { if (item.fields.departmentName) filterOptions.push(item.fields.departmentName)})
        return {
            filterCategory: 'Departments',
            filterLabels: filterOptions,
        };
    }
}