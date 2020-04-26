import { isAsset } from "../../../backend/base";
import { IDepartment } from "../../../backend/model";
import { IPersonDepartment } from "../../../client/model/department";


export function resolveDepartmentType(department: IDepartment): IPersonDepartment {
    let { sys } = department;
    let { departmentImage, departmentName, departmentUrl } = department.fields;
    return {
        id: sys.id,
        departmentImage: isAsset(departmentImage) && departmentImage.fields.file.url ? departmentImage.fields.file.url : '',
        departmentName: departmentName? departmentName : 'Department Name',
        departmentUrl: departmentUrl ? departmentUrl : ''
    }
}