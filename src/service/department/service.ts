import { IDepartment } from '../../types/backend/model';
import { ContentfulListBaseResponse, ContentfulIncludedLinks } from '../../types/backend/base';
import { makeContentManagementGetRequest } from '../util/http';


export interface IDepartmentService {
    getAllDepartments(): Promise<IDepartment[]>;
}

export default function getDepartmentService(): IDepartmentService {
    return {
        getAllDepartments: getAllDepartments,
    }
}

const allDepartmentsQuery = `${process.env.REACT_APP_CMS_BASE_URL}/entries?&content_type=department`;

async function getAllDepartments(): Promise<IDepartment[]> {
    return getDepartmentsWhere(allDepartmentsQuery)
}


async function getDepartmentsWhere(query: string): Promise<IDepartment[]> {
    const departmentResponse = await makeContentManagementGetRequest(query);
    let reducedDepartments: ContentfulListBaseResponse<IDepartment> = await departmentResponse.json();
    return reducedDepartments.items.map((department) => resolveDepartmentLinks(department, reducedDepartments.includes!!))
}


export function resolveDepartmentLinks(department: IDepartment, assets: ContentfulIncludedLinks): IDepartment {
    let assetId = department?.fields?.departmentImage?.sys.id;

    return {
        ...department,
        fields: {
            ...department.fields,
            departmentImage: assets.Asset.find((asset) => asset.sys.id === assetId)!!,
        }
    }
}    