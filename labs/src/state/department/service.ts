import { IDepartment } from '../../types/cms/generated';
import { ContentfulBaseResponse, ContentfulIncludedLinks } from '../../types/cms/base';


export interface IDepartmentService {
    getAllDepartments(): Promise<IDepartment[]>;
}

export default function useDepartmentService(): IDepartmentService {
    return {
        getAllDepartments: getAllDepartments,
    }
}

const allDepartmentsQuery = `${process.env.REACT_APP_CMS_BASE_URL}/entries?&content_type=department`;

async function getAllDepartments(): Promise<IDepartment[]> {
    return getDepartmentsWhere(allDepartmentsQuery)
}

// TODO: Can make a lot of this generic
async function getDepartmentsWhere(query: string): Promise<IDepartment[]> {
    const departmentResponse = await fetch(
        query,
        {
            method: "GET",
            headers: new Headers({
                Authorization: `Bearer ${process.env.REACT_APP_CONTENTFUL_API_KEY}`
            })
        })

    if (!departmentResponse.ok) {
        // TODO: Make failed network request better
        throw Error(`${departmentResponse.status}\n${departmentResponse.statusText}`)
    };
    // TODO: Fallback fields for missing stuff - empty strings and unpublished content is underfined
    let reducedDepartments: ContentfulBaseResponse<IDepartment> = await departmentResponse.json();
    return reducedDepartments.items.map((department) => resolveDepartmentLinks(department, reducedDepartments.includes!!))
}


function resolveDepartmentLinks(department: IDepartment, assets: ContentfulIncludedLinks): IDepartment {
    let assetId = department?.fields?.departmentImage?.sys.id;

    return {
        ...department,
        fields: {
            ...department.fields,
            departmentImage: assets.Asset.find((asset) => asset.sys.id === assetId)!!,
        }
    }
}    