import React from 'react';
import SearchBar from '../molecules/SearchBar';
import { Col, Row } from 'react-flexbox-grid';
import FilterGroup from './FilterGroup';
import { ISearchFilter } from '../../types/client/page/search';


// TODO: add individual callbacks for filters and querying
interface ISearchGroupProps {
    loadingFilters: boolean;
    searchSuggestions: string[];
    searchBarHintText: string;
    filters: ISearchFilter[];
    currentQuery: string;
    onSearch: (query: string) => void;
    onSelectedFiltersChanged: (filters: ISearchFilter[]) => void;
}

const DisconnectedSearchGroup: React.FC<ISearchGroupProps> = props => {
    const {searchBarHintText, onSearch, loadingFilters, currentQuery, searchSuggestions, onSelectedFiltersChanged, filters} = props;
    return (
        <Row>
            <Col xs={12}>
                <SearchBar
                    startQuery={currentQuery}
                    searchSuggestions={searchSuggestions} 
                    hintText={searchBarHintText} 
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

export default DisconnectedSearchGroup;