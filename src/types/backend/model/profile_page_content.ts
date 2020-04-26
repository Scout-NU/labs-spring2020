import { Entry, IEntry, ISys } from "../base";

export interface IProfilePageContentFields {
  emailMeLabel?: string;
  ambassadorDescriptionHeader?: string;
  projectSectionHeader?: string;
  seeMoreDepartmentWorkLabel?: string;
  relatedAmbassadorsSectionHeader?: string;
}

/**
 * Profile Page Content
 * Copy for the profile page template. Ambassador details are fetched separately.
 */
export interface IProfilePageContent extends IEntry<IProfilePageContentFields> {
}

export function isProfilePageContent(entry: IEntry<any>): entry is IProfilePageContent {
  return entry &&
    entry.sys &&
    entry.sys.contentType &&
    entry.sys.contentType.sys &&
    entry.sys.contentType.sys.id == 'profilePageContent'
}

export class ProfilePageContent extends Entry<IProfilePageContentFields> implements IProfilePageContent {
  public readonly sys!: ISys<'Entry'>;
  public readonly fields!: IProfilePageContentFields;

  get emailMeLabel(): string | undefined {
    return this.fields.emailMeLabel
  }

  get email_me_label(): string | undefined {
    return this.fields.emailMeLabel
  }

  get ambassadorDescriptionHeader(): string | undefined {
    return this.fields.ambassadorDescriptionHeader
  }

  get ambassador_description_header(): string | undefined {
    return this.fields.ambassadorDescriptionHeader
  }

  get projectSectionHeader(): string | undefined {
    return this.fields.projectSectionHeader
  }

  get project_section_header(): string | undefined {
    return this.fields.projectSectionHeader
  }

  get seeMoreDepartmentWorkLabel(): string | undefined {
    return this.fields.seeMoreDepartmentWorkLabel
  }

  get see_more_department_work_label(): string | undefined {
    return this.fields.seeMoreDepartmentWorkLabel
  }

  get relatedAmbassadorsSectionHeader(): string | undefined {
    return this.fields.relatedAmbassadorsSectionHeader
  }

  get related_ambassadors_section_header(): string | undefined {
    return this.fields.relatedAmbassadorsSectionHeader
  }

  constructor(entry: IProfilePageContent);
  constructor(id: string, fields: IProfilePageContentFields);
  constructor(entryOrId: IProfilePageContent | string, fields?: IProfilePageContentFields) {
    super(entryOrId, 'profilePageContent', fields)
  }
}
