export interface ISearchContent {
    pageHeader: string;
    pageSubheader: string;
    searchBarHint: string;
    noResultsImageUrl: string;
    noResultsHeader: string;
    noResultsSuggestions: string[];
}

export interface IFilter {
    filterName: string;
    filterLabels: string[];
    selectedFilters: string[];
    id: string; // ID of the fitler. Should be unique.
}