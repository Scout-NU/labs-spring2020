import { IAmbassador, IProblemTag } from "../../../types/cms/generated";
import { IPerson, IProfile } from "../../../types/client/client";
import { isAsset, isEntry, ILink } from "../../../types/cms";



export function mapAmbassadorsToPerson(ambassadors: IAmbassador[]): IPerson[] {
    return ambassadors.map((item) => mapAmbassadorToPerson(item));
}

export function mapAmbassadorToPerson(ambassador: IAmbassador): IPerson {
    let data = ambassador.fields;
    let asset = ambassador.fields.profilePicture!!;
    let tags = ambassador.fields.tags;
    
    return {
        id: ambassador.sys.id,
        profileImageUrl: isAsset(asset) && asset.fields.file.url ? asset.fields.file.url : '',
        firstName: data.firstName ? data.firstName : '',
        lastName: data.lastName ? data.lastName : '',
        positionTitle: data.positionTitle? data.positionTitle : '',
        description: data.ambassadorDescription? data.ambassadorDescription : '',
        genderPronouns: data.preferredPronouns ? data.preferredPronouns.join("/") : '',
        tags: tags? resolveTags(tags) : []
    }
}

export function mapAmbassadorToProfile(ambassador: IAmbassador): IProfile {
    let data = ambassador.fields;
    let person = mapAmbassadorToPerson(ambassador);

    return {
        ...person,
        relatedPeople: data.relatedAmbassadors ? mapAmbassadorsToPerson(resolveRelatedAmbassadors(data.relatedAmbassadors)) : [],
        priorityStatement: data.priorityStatement ? data.priorityStatement : '',
        knowledgeableTopics: data.knowledgeableTopics ? data.knowledgeableTopics : [],
    }
}

// TODO: Can also make this abstract
function resolveRelatedAmbassadors(ambassadors: (ILink<"Entry"> | IAmbassador)[]): IAmbassador[] {
    let resolvedAmbassadors: IAmbassador[] = [];

    ambassadors.forEach((ambassador) => {
        if (isEntry(ambassador)) resolvedAmbassadors.push(ambassador);
    })

    return resolvedAmbassadors;
}

function resolveTags(tags: (ILink<"Entry"> | IProblemTag)[]): string[] {
    let resolvedTags: string[] = [];

    tags.forEach((tag) => {
        if (isEntry(tag) && tag.fields.tagName) resolvedTags.push(tag.fields.tagName);
    })

    return resolvedTags;
}