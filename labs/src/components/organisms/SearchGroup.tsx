import React from 'react';
import SearchBar from '../molecules/SearchBar';
import { Col, Row } from 'react-flexbox-grid';
import FilterGroup from './FilterGroup';
import { IFilter } from '../../types/client/client';
import { v4 as uuidv4 } from 'uuid';
import Spinner from '../atoms/Spinner';
import { URLQueryParser } from '../../state/util/filters';
import useFilterService from '../../state/filter/service';

// TODO: add individual callbacks for filters and querying
interface ISearchGroupProps {
    searchSuggestions: string[];
    searchBarHintText: string;
    filters: IFilter[];
    currentQuery: string;
    onSearch: (query: string) => void;
    onSelectedFiltersChanged: (filters: IFilter[]) => void;
}

const DisconnectedSearchGroup: React.FC<ISearchGroupProps> = props => {
    const {searchBarHintText, onSearch} = props;
    return (
        <Row>
            <Col xs={12}>
                <SearchBar
                    startQuery={props.currentQuery}
                    searchSuggestions={props.searchSuggestions} 
                    hintText={searchBarHintText} 
                    onQueryContentsChanged={(v) => Function.prototype } 
                    onSearch={onSearch}
                />
        
                <FilterGroup 
                    filters={props.filters}
                    onSelectedFiltersChanged={props.onSelectedFiltersChanged}
                />
            </Col>
        </Row>
    )
}

const SearchGroup: React.FC = props => {
    const [suggestions, setSuggestions] = React.useState<string[]>(['Climate Change', 'Gun Control', 'Mental Health', 'Affordable Housing']);
    const [filters, setFilters] = React.useState<IFilter[]>([]);
    const [query, setQuery] = React.useState("");
    const [loading, setLoading] = React.useState(true);
    const filterService = useFilterService();
    
    React.useEffect(() => {
        async function getSearchData() {
            let parsedQuery = new URLQueryParser(new URLSearchParams(window.location.search));
            filterService.getAllFilters()
            .then(res => {
                setFilters(
                    res.map(filter => 
                        buildFilter(filter.filterLabels, 
                        filter.filterCategory, 
                        parsedQuery.getSelectedOptions(filter.filterCategory)))
                )
                setQuery(parsedQuery.getQuery())
                setLoading(false)
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

    if (loading) {
        return (<Spinner/>)
    }

    return (
        <DisconnectedSearchGroup 
            currentQuery={query}
            searchSuggestions={suggestions}
            searchBarHintText={'Search by topic or name'}
            onSelectedFiltersChanged={onSelectedFiltersChanged}
            onSearch={onSearch}
            filters={filters}
        />
    )
}

export default SearchGroup;