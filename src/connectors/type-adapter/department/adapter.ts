import { IDepartment } from "../../../types/backend/model";
import { IAmbassadorDepartment } from "../../../types/client/model";
import { isAsset } from "../../../types/backend/base";

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