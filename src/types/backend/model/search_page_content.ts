import { wrap } from ".";
import { Asset, Entry, IAsset, IEntry, ILink, isAsset, isEntry, ISys } from "../base";
import { ISearchFilter, SearchFilter } from "./search_filter";

export interface ISearchPageContentFields {
  pageHeader?: string;
  pageSubheader?: string;
  searchBarHint?: string;
  filters?: Array<ILink<'Entry'> | ISearchFilter>;
  noResultsImage?: ILink<'Asset'> | IAsset;
  noResultsHeader?: string;
  noResultsSuggestions?: string[];
}

/**
 * Search Page Content
 */
export interface ISearchPageContent extends IEntry<ISearchPageContentFields> {
}

export function isSearchPageContent(entry: IEntry<any>): entry is ISearchPageContent {
  return entry &&
    entry.sys &&
    entry.sys.contentType &&
    entry.sys.contentType.sys &&
    entry.sys.contentType.sys.id === 'searchPageContent'
}

export class SearchPageContent extends Entry<ISearchPageContentFields> implements ISearchPageContent {
  public readonly sys!: ISys<'Entry'>;
  public readonly fields!: ISearchPageContentFields;

  get pageHeader(): string | undefined {
    return this.fields.pageHeader
  }

  get page_header(): string | undefined {
    return this.fields.pageHeader
  }

  get pageSubheader(): string | undefined {
    return this.fields.pageSubheader
  }

  get page_subheader(): string | undefined {
    return this.fields.pageSubheader
  }

  get searchBarHint(): string | undefined {
    return this.fields.searchBarHint
  }

  get search_bar_hint(): string | undefined {
    return this.fields.searchBarHint
  }

  get filters(): Array<SearchFilter | null> | undefined {
    return !this.fields.filters ? undefined :
      this.fields.filters.map((item) =>
        isEntry(item) ? wrap<'searchFilter'>(item) : null
      )
  }

  get noResultsImage(): Asset | null | undefined {
    return !this.fields.noResultsImage ? undefined :
      (isAsset(this.fields.noResultsImage) ? new Asset(this.fields.noResultsImage) : null)
  }

  get no_results_image(): Asset | null | undefined {
    return !this.fields.noResultsImage ? undefined :
      (isAsset(this.fields.noResultsImage) ? new Asset(this.fields.noResultsImage) : null)
  }

  get noResultsHeader(): string | undefined {
    return this.fields.noResultsHeader
  }

  get no_results_header(): string | undefined {
    return this.fields.noResultsHeader
  }

  get noResultsSuggestions(): string[] | undefined {
    return this.fields.noResultsSuggestions
  }

  get no_results_suggestions(): string[] | undefined {
    return this.fields.noResultsSuggestions
  }

  constructor(entry: ISearchPageContent);
  constructor(id: string, fields: ISearchPageContentFields);
  constructor(entryOrId: ISearchPageContent | string, fields?: ISearchPageContentFields) {
    super(entryOrId, 'searchPageContent', fields)
  }
}
