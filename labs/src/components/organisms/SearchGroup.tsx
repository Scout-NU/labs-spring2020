import React from 'react';
import SearchBar from '../molecules/SearchBar';
import { Col, Row } from 'react-flexbox-grid';
import FilterGroup from './FilterGroup';
import { IFilter } from '../../types/client/client';



// TODO: add individual callbacks for filters and querying
interface ISearchGroupProps {
    searchSuggestions: string[];
    searchBarHintText: string;
    filters: IFilter[];
    onSearch: (query: string, tagFilters: string[], departmentFilters: string[]) => void;
}


const DisconnectedSearchGroup: React.FC<ISearchGroupProps> = props => {
    const {searchBarHintText, onSearch} = props;

    const onSearchBarSearched = (query: string) => {

    }

    const onQueryContentsChanged = (value: string) => {
        console.log(value)
    }

    const onFiltersChanged = (issues: string[], departments: string[]) => {

    }

    return (
        <Row>
            <Col xs={12}>
                <SearchBar
                    searchSuggestions={props.searchSuggestions} 
                    hintText={searchBarHintText} 
                    onQueryContentsChanged={(v) => onQueryContentsChanged(v)} 
                    onSearch={(q) => onSearchBarSearched(q)}
                />
        
                <FilterGroup 
                    filters={props.filters}
                    onSelectedFiltersChanged={(issues, departments) => onFiltersChanged(issues, departments)}
                />
            </Col>
        </Row>
    )
}

const SearchGroup: React.FC = props => {
    const [suggestions, setSuggestions] = React.useState<string[]>(['Climate Change', 'Gun Control', 'Mental Health', 'Affordable Housing']);
    const [filters, setFilters] = React.useState<IFilter[]>([]);

    

    return (
        <DisconnectedSearchGroup 
            searchSuggestions={suggestions}
            searchBarHintText={'Search by topic or name'}
            onSearch={() => console.log("woo")}
            filters={filters}
        />
    )
}

export default SearchGroup;