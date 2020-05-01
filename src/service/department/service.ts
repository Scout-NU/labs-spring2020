import { IDepartment } from '../../types/backend/model';
import { ContentfulListBaseResponse, Resolved } from '../../types/backend/base';
import { IContentManagementClient, ContentManagementClient } from '../util/client';
import { resolveEntry } from '../../types/backend/utils';


export interface IDepartmentService {
    getAllDepartments(): Promise<IDepartment[]>;
}

/*
 * This service is responsible for fetching departments.
 */
export default class DepartmentService implements IDepartmentService {
    private allDepartmentsQuery = `${process.env.REACT_APP_CMS_BASE_URL}/entries?&content_type=department`;

    // This is sort of fake dependency injection. I have a section on it in the wiki in the improvements section. It is important for testing.
    private client: IContentManagementClient = new ContentManagementClient()

    async getAllDepartments(): Promise<IDepartment[]> {
        return this.getDepartmentsWhere(this.allDepartmentsQuery)
    }

    private async getDepartmentsWhere(query: string): Promise<IDepartment[]> {
        const departmentResponse = await this.client.makeRequest(query);
        let reducedDepartments: ContentfulListBaseResponse<IDepartment> = await departmentResponse.json();
        return this.parseDepartmentResponse(reducedDepartments);
    }

    private parseDepartmentResponse(response: ContentfulListBaseResponse<IDepartment>): Resolved<IDepartment>[] {
        return response.items.map(d => resolveEntry(d, response.includes!!));
    }
}