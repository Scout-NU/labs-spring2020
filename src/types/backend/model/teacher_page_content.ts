import { wrap } from ".";
import { Asset, Entry, IAsset, IEntry, ILink, isAsset, isEntry, ISys } from "../base";
import { ITeacherResource, TeacherResource } from "./teacher_resource";
import { IUrl, Url } from "./url";
import { PageDiscriminator } from "./page";

export interface ITeacherPageContentFields {
  pageHeader?: string;
  pageSubheader?: string;
  contentUrl?: ILink<'Entry'> | IUrl;
  headerDecoration?: ILink<'Asset'> | IAsset;
  resources?: Array<ILink<'Entry'> | ITeacherResource>;
}

/**
 * Teacher Page Content
 */
export interface ITeacherPageContent extends IEntry<ITeacherPageContentFields> {
  kind: PageDiscriminator.TEACHER;
}

export function isTeacherPageContent(entry: IEntry<any>): entry is ITeacherPageContent {
  return entry &&
    entry.sys &&
    entry.sys.contentType &&
    entry.sys.contentType.sys &&
    entry.sys.contentType.sys.id == 'teacherPageContent'
}

// export class TeacherPageContent extends Entry<ITeacherPageContentFields> implements ITeacherPageContent {
//   public readonly sys!: ISys<'Entry'>;
//   public readonly fields!: ITeacherPageContentFields;

//   get pageHeader(): string | undefined {
//     return this.fields.pageHeader
//   }

//   get page_header(): string | undefined {
//     return this.fields.pageHeader
//   }

//   get pageSubheader(): string | undefined {
//     return this.fields.pageSubheader
//   }

//   get page_subheader(): string | undefined {
//     return this.fields.pageSubheader
//   }

//   get contentUrl(): Url | null | undefined {
//     return !this.fields.contentUrl ? undefined :
//       (isEntry(this.fields.contentUrl) ? wrap<'url'>(this.fields.contentUrl) : null)
//   }

//   get content_url(): Url | null | undefined {
//     return !this.fields.contentUrl ? undefined :
//       (isEntry(this.fields.contentUrl) ? wrap<'url'>(this.fields.contentUrl) : null)
//   }

//   get headerDecoration(): Asset | null | undefined {
//     return !this.fields.headerDecoration ? undefined :
//       (isAsset(this.fields.headerDecoration) ? new Asset(this.fields.headerDecoration) : null)
//   }

//   get header_decoration(): Asset | null | undefined {
//     return !this.fields.headerDecoration ? undefined :
//       (isAsset(this.fields.headerDecoration) ? new Asset(this.fields.headerDecoration) : null)
//   }

//   get resources(): Array<TeacherResource | null> | undefined {
//     return !this.fields.resources ? undefined :
//       this.fields.resources.map((item) =>
//         isEntry(item) ? wrap<'teacherResource'>(item) : null
//       )
//   }

//   constructor(entry: ITeacherPageContent);
//   constructor(id: string, fields: ITeacherPageContentFields);
//   constructor(entryOrId: ITeacherPageContent | string, fields?: ITeacherPageContentFields) {
//     super(entryOrId, 'teacherPageContent', fields)
//   }
// }
