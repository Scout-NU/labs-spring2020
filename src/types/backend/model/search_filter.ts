import { wrap } from ".";
import { Entry, IEntry, ILink, isEntry, ISys } from "../base";
import { Department, IDepartment } from "./department";
import { IProblemTag, ProblemTag } from "./problem_tag";

export interface ISearchFilterFields {
  filterName?: string;
  filterItem?: Array<ILink<'Entry'> | SearchFilterFilterItem>;
}

export type SearchFilterFilterItem = IDepartment | IProblemTag;
export type SearchFilterFilterItemClass = Department | ProblemTag;

/**
 * Search Filter
 * A filter that users can use to filter search content.
 */
export interface ISearchFilter extends IEntry<ISearchFilterFields> {
}

export function isSearchFilter(entry: IEntry<any>): entry is ISearchFilter {
  return entry &&
    entry.sys &&
    entry.sys.contentType &&
    entry.sys.contentType.sys &&
    entry.sys.contentType.sys.id == 'searchFilter'
}

export class SearchFilter extends Entry<ISearchFilterFields> implements ISearchFilter {
  public readonly sys!: ISys<'Entry'>;
  public readonly fields!: ISearchFilterFields;

  get filterName(): string | undefined {
    return this.fields.filterName
  }

  get filter_name(): string | undefined {
    return this.fields.filterName
  }

  get filterItem(): Array<SearchFilterFilterItemClass | null> | undefined {
    return !this.fields.filterItem ? undefined :
      this.fields.filterItem.map((item) =>
        isEntry(item) ? wrap<'department' | 'problemTag'>(item) : null
      )
  }

  get filter_item(): Array<SearchFilterFilterItemClass | null> | undefined {
    return !this.fields.filterItem ? undefined :
      this.fields.filterItem.map((item) =>
        isEntry(item) ? wrap<'department' | 'problemTag'>(item) : null
      )
  }

  constructor(entry: ISearchFilter);
  constructor(id: string, fields: ISearchFilterFields);
  constructor(entryOrId: ISearchFilter | string, fields?: ISearchFilterFields) {
    super(entryOrId, 'searchFilter', fields)
  }
}
