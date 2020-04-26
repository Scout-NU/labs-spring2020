import { wrap } from ".";
import { Asset, Entry, IAsset, IEntry, ILink, isAsset, isEntry, ISys } from "../base";
import { AmbassadorProjectAssociation, IAmbassadorProjectAssociation } from "./ambassador_project_association";
import { Department, IDepartment } from "./department";
import { IProblemTag, ProblemTag } from "./problem_tag";

export interface IAmbassadorFields {
  firstName?: string;
  lastName?: string;
  positionTitle?: string;
  department?: ILink<'Entry'> | IDepartment;
  ambassadorDescription?: string;
  profilePicture?: ILink<'Asset'> | IAsset;
  preferredPronouns?: string[];
  email?: string;
  priorityStatement?: string;
  relatedAmbassadors?: Array<ILink<'Entry'> | IAmbassador>;
  knowledgeableTopics?: string[];
  projects?: Array<ILink<'Entry'> | IAmbassadorProjectAssociation>;
  tags?: Array<ILink<'Entry'> | IProblemTag>;
}

/**
 * Ambassador
 */
export interface IAmbassador extends IEntry<IAmbassadorFields> {
}

export function isAmbassador(entry: IEntry<any>): entry is IAmbassador {
  return entry &&
    entry.sys &&
    entry.sys.contentType &&
    entry.sys.contentType.sys &&
    entry.sys.contentType.sys.id === 'ambassador'
}

export class Ambassador extends Entry<IAmbassadorFields> implements IAmbassador {
  public readonly sys!: ISys<'Entry'>;
  public readonly fields!: IAmbassadorFields;

  get firstName(): string | undefined {
    return this.fields.firstName
  }

  get first_name(): string | undefined {
    return this.fields.firstName
  }

  get lastName(): string | undefined {
    return this.fields.lastName
  }

  get last_name(): string | undefined {
    return this.fields.lastName
  }

  get positionTitle(): string | undefined {
    return this.fields.positionTitle
  }

  get position_title(): string | undefined {
    return this.fields.positionTitle
  }

  get department(): Department | null | undefined {
    return !this.fields.department ? undefined :
      (isEntry(this.fields.department) ? wrap<'department'>(this.fields.department) : null)
  }

  get ambassadorDescription(): string | undefined {
    return this.fields.ambassadorDescription
  }

  get ambassador_description(): string | undefined {
    return this.fields.ambassadorDescription
  }

  get profilePicture(): Asset | null | undefined {
    return !this.fields.profilePicture ? undefined :
      (isAsset(this.fields.profilePicture) ? new Asset(this.fields.profilePicture) : null)
  }

  get profile_picture(): Asset | null | undefined {
    return !this.fields.profilePicture ? undefined :
      (isAsset(this.fields.profilePicture) ? new Asset(this.fields.profilePicture) : null)
  }

  get preferredPronouns(): string[] | undefined {
    return this.fields.preferredPronouns
  }

  get preferred_pronouns(): string[] | undefined {
    return this.fields.preferredPronouns
  }

  get email(): string | undefined {
    return this.fields.email
  }

  get priorityStatement(): string | undefined {
    return this.fields.priorityStatement
  }

  get priority_statement(): string | undefined {
    return this.fields.priorityStatement
  }

  get relatedAmbassadors(): Array<Ambassador | null> | undefined {
    return !this.fields.relatedAmbassadors ? undefined :
      this.fields.relatedAmbassadors.map((item) =>
        isEntry(item) ? wrap<'ambassador'>(item) : null
      )
  }

  get related_ambassadors(): Array<Ambassador | null> | undefined {
    return !this.fields.relatedAmbassadors ? undefined :
      this.fields.relatedAmbassadors.map((item) =>
        isEntry(item) ? wrap<'ambassador'>(item) : null
      )
  }

  get knowledgeableTopics(): string[] | undefined {
    return this.fields.knowledgeableTopics
  }

  get knowledgeable_topics(): string[] | undefined {
    return this.fields.knowledgeableTopics
  }

  get projects(): Array<AmbassadorProjectAssociation | null> | undefined {
    return !this.fields.projects ? undefined :
      this.fields.projects.map((item) =>
        isEntry(item) ? wrap<'ambassadorProjectAssociation'>(item) : null
      )
  }

  get tags(): Array<ProblemTag | null> | undefined {
    return !this.fields.tags ? undefined :
      this.fields.tags.map((item) =>
        isEntry(item) ? wrap<'problemTag'>(item) : null
      )
  }

  constructor(entry: IAmbassador);
  constructor(id: string, fields: IAmbassadorFields);
  constructor(entryOrId: IAmbassador | string, fields?: IAmbassadorFields) {
    super(entryOrId, 'ambassador', fields)
  }
}
