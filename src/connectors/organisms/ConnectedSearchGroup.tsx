import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { URLQueryParser } from '../../state/util/filters';
import getFilterService from '../../state/filter/service';
import { IFilter } from '../../types/client/client';
import DisconnectedSearchGroup from '../../components/organisms/SearchGroup';

const SearchGroup: React.FC = props => {
    const [suggestions, setSuggestions] = React.useState<string[]>(['Climate Change', 'Gun Control', 'Mental Health', 'Affordable Housing']);
    const [filters, setFilters] = React.useState<IFilter[]>([]);
    const [query, setQuery] = React.useState("");
    const [loadingFilters, setLoading] = React.useState(true);
    
    React.useEffect(() => {
        async function getSearchData() {
            let filterService = getFilterService();
            let parsedQuery = new URLQueryParser(new URLSearchParams(window.location.search));
            filterService.getAllFilters()
            .then(res => {
                setFilters(
                    res.map(filter => 
                        buildFilter(filter.filterLabels, 
                        filter.filterCategory, 
                        parsedQuery.getSelectedOptions(filter.filterCategory)))
                );
                setQuery(parsedQuery.getQuery());
                setLoading(false);
            })            
        }
        getSearchData();
    }, []);

    const buildFilter = (filterLabels: string[], filterName: string, selectedFilters: string[]) => {
        return {
            filterName: filterName,
            filterLabels: filterLabels,
            selectedFilters: selectedFilters,
            id: uuidv4()
        };
    }
    
    const onSelectedFiltersChanged = (filters: IFilter[]) => {
        let params = new URLSearchParams(window.location.search);
        filters.forEach(f => {
            if (f.selectedFilters.length === 0) {
                params.delete(f.filterName)
            } else {
                params.set(f.filterName, f.selectedFilters.join(','))
            }
        });
        assignURL(params);
    }

    const onSearch = (query: string) => {
        let params = new URLSearchParams(window.location.search);

        if (query === '') {
             params.delete('query')
        } else { 
            params.set('query', query) 
        }

        assignURL(params);
    }

    const assignURL = (params: URLSearchParams) => {
        let baseSearchURL = `${window.location.origin}${window.location.pathname}?`;
        window.location.assign(`${baseSearchURL}${params.toString()}`);
    }

    return (
        <DisconnectedSearchGroup 
            currentQuery={query}
            searchSuggestions={suggestions}
            searchBarHintText={'Search by topic or name'}
            onSelectedFiltersChanged={onSelectedFiltersChanged}
            onSearch={onSearch}
            filters={filters}
            loadingFilters={loadingFilters}
        />
    )
}

export default SearchGroup;