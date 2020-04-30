import React from 'react';
import SearchBar from '../../molecules/search-bar/SearchBar';
import { Col, Row } from 'react-flexbox-grid';
import FilterGroup from '../filter-group/FilterGroup';
import { IFilter } from '../../../types/client/page/search';


interface ISearchGroupProps {
    loadingFilters: boolean;
    searchSuggestions: string[];
    searchBarHintText: string;
    filters: IFilter[];
    currentQuery: string;
    onSearch: (query: string) => void;
    onSelectedFiltersChanged: (filters: IFilter[]) => void;
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