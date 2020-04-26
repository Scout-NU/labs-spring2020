import { wrap } from ".";
import { Asset, Entry, IAsset, IEntry, ILink, isAsset, isEntry, ISys } from "../base";
import { IUrl, Url } from "./url";

export interface ITeacherResourceFields {
  resourceTitle?: string;
  resourceDescription?: string;
  resourceUrl?: ILink<'Entry'> | IUrl;
  resourceCoverImage?: ILink<'Asset'> | IAsset;
}

/**
 * Teacher Resource
 */
export interface ITeacherResource extends IEntry<ITeacherResourceFields> {
}

export function isTeacherResource(entry: IEntry<any>): entry is ITeacherResource {
  return entry &&
    entry.sys &&
    entry.sys.contentType &&
    entry.sys.contentType.sys &&
    entry.sys.contentType.sys.id === 'teacherResource'
}

export class TeacherResource extends Entry<ITeacherResourceFields> implements ITeacherResource {
  public readonly sys!: ISys<'Entry'>;
  public readonly fields!: ITeacherResourceFields;

  get resourceTitle(): string | undefined {
    return this.fields.resourceTitle
  }

  get resource_title(): string | undefined {
    return this.fields.resourceTitle
  }

  get resourceDescription(): string | undefined {
    return this.fields.resourceDescription
  }

  get resource_description(): string | undefined {
    return this.fields.resourceDescription
  }

  get resourceUrl(): Url | null | undefined {
    return !this.fields.resourceUrl ? undefined :
      (isEntry(this.fields.resourceUrl) ? wrap<'url'>(this.fields.resourceUrl) : null)
  }

  get resource_url(): Url | null | undefined {
    return !this.fields.resourceUrl ? undefined :
      (isEntry(this.fields.resourceUrl) ? wrap<'url'>(this.fields.resourceUrl) : null)
  }

  get resourceCoverImage(): Asset | null | undefined {
    return !this.fields.resourceCoverImage ? undefined :
      (isAsset(this.fields.resourceCoverImage) ? new Asset(this.fields.resourceCoverImage) : null)
  }

  get resource_cover_image(): Asset | null | undefined {
    return !this.fields.resourceCoverImage ? undefined :
      (isAsset(this.fields.resourceCoverImage) ? new Asset(this.fields.resourceCoverImage) : null)
  }

  constructor(entry: ITeacherResource);
  constructor(id: string, fields: ITeacherResourceFields);
  constructor(entryOrId: ITeacherResource | string, fields?: ITeacherResourceFields) {
    super(entryOrId, 'teacherResource', fields)
  }
}
