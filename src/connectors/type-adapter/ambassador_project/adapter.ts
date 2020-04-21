import { IAmbassadorProjectAssociation } from "../../../types/backend/model";
import { IPersonProject } from "../../../types/client/model";
import { resolveAssetLink, resolveEntryLink } from "../../../types/backend/base";

export function resolveAmbassadorProjectTypes(projects: IAmbassadorProjectAssociation[]): IPersonProject[] {
    return projects.map(p => resolveAmbassadorProjectType(p));
}

export function resolveAmbassadorProjectType(project: IAmbassadorProjectAssociation): IPersonProject {
    let { ambassadorNotes, departmentProject } = project.fields;
    let resolvedProject = resolveEntryLink(departmentProject);
    let resolvedProjectImage = resolvedProject?.fields.projectImage ? resolveAssetLink(resolvedProject?.fields.projectImage) : null;

    return {
        projectImageUrl: resolvedProjectImage?.fields.file.url ? resolvedProjectImage.fields.file.url : '',
        personNotes: ambassadorNotes ? ambassadorNotes : '',
        projectTitle: resolvedProject?.fields.title ? resolvedProject?.fields.title : ''
    }
}