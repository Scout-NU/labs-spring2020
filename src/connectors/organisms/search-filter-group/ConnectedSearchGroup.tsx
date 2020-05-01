import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { URLQueryParser } from '../../../service/util/url';
import getFilterService from '../../../service/filter/service';
import { IFilter } from '../../../types/client/page/search';
import { Col, Row } from 'react-flexbox-grid';
import SearchBar from '../../../components/molecules/search-bar/SearchBar';
import FilterGroup from '../../../components/organisms/filter-group/FilterGroup';

/**
 * This is a component that groups together the search bar and the filters. 
 * Filters are abstracted away behind the filter service. This knows how to fetch all of the filters from the CMS,
 * assemble their options, and present them. 
 * 
 * It also contains the logic to kick off a search. This component is not responsible for actually doing a search, but 
 * just redirecting to the search route. The Search Page actually cares about the URL and does the process of searching. This
 * is to allow for this component to be placed theoretically anywhere on the site and still achieve the same results.
 * 
 * REFACTOR (optional): This behavior could also be replaced with a Search Context if it comes to a point where the URL query string
 * thing needs to change. See the Contact List context for an example of how that idea would work.
 */
const SearchGroup: React.FC = props => {
    const suggestions = ['Climate Change', 'Gun Control', 'Mental Health', 'Affordable Housing'];
    const [filters, setFilters] = React.useState<IFilter[]>([]);
    const [query, setQuery] = React.useState("");
    const [loadingFilters, setLoading] = React.useState(true);
    
    // On first render, get all of the filters to use
    React.useEffect(() => {
        async function getSearchData() {
            let filterService = getFilterService();
            let parsedQuery = new URLQueryParser(new URLSearchParams(window.location.search));
            filterService.getAllFilters()
            .then(res => {
                // Set the filters
                setFilters(
                    res.map(filter => 
                        buildFilter(filter.filterLabels, 
                        filter.filterCategory, 
                        parsedQuery.getValuesForParameter(filter.filterCategory)))
                );

                // Set the current query from the url
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
    
    // When someone hits apply filters
    const onSelectedFiltersChanged = (filters: IFilter[]) => {
        let params = new URLSearchParams(window.location.search);
        filters.forEach(f => {
            // If someone cleared all of the filters for a certain type, totally remove that from the URL for cleanliness
            if (f.selectedFilters.length === 0) {
                params.delete(f.filterName)
            } else {
                // Add the filters to the query string
                params.set(f.filterName, f.selectedFilters.join(','))
            }
        });
        assignURL(params);
    }

    const onSearch = (query: string) => {
        let params = new URLSearchParams(window.location.search);

        if (query === '') {
            // Clean up URL
             params.delete('query')
        } else { 
            // Set the query
            params.set('query', query) 
        }

        assignURL(params);
    }

    const assignURL = (params: URLSearchParams) => {
        let baseSearchURL = `${window.location.origin}${window.location.pathname}?`;
        window.location.assign(`${baseSearchURL}${params.toString()}`);
    }

    return (
        <Row>
            <Col xs={12}>
                <SearchBar
                    startQuery={query}
                    searchSuggestions={suggestions} 
                    hintText={'Search by topic or name'} 
                    onQueryContentsChanged={(v) => Function.prototype } 
                    onSearch={onSearch}
                />
                {!loadingFilters &&
                    <FilterGroup 
                        filters={filters}
                        onSelectedFiltersChanged={onSelectedFiltersChanged}
                    />
                }
            </Col>
        </Row>
    )
}

export default SearchGroup;