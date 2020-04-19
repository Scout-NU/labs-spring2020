import { IDepartment } from "../../../types/cms/generated";
import { IAmbassadorDepartment } from "../../../types/client/client";
import { isAsset } from "../../../types/cms";

export function resolveDepartmentType(department: IDepartment): IAmbassadorDepartment {
    let { sys } = department;
    let { departmentImage, departmentName, departmentUrl } = department.fields;
    return {
        id: sys.id,
        departmentImage: isAsset(departmentImage) && departmentImage.fields.file.url ? departmentImage.fields.file.url : '',
        departmentName: departmentName? departmentName : 'Department Name',
        departmentUrl: departmentUrl ? departmentUrl : ''
    }
}