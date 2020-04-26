export interface ISearchContent {
    pageHeader: string;
    pageSubheader: string;
    searchBarHint: string;
    filters: ISearchFilter[];
    noResultsImageUrl: string;
    noResultsHeader: string;
    noResultsSuggestions: string[];
}

export interface ISearchFilter {
    filterName: string;
    filterLabels: string[];
    selectedFilters: string[];
    id: string; // ID of the fitler. Should be unique.
}