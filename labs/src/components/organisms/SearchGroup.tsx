import React from 'react';
import SearchBar from '../molecules/SearchBar';


interface ISearchGroupProps {
    searchBarHintText: string;
    onSearch: (query: string, tagFilters: string[], departmentFilters: string[]) => void;
}

const DisconnectedSearchGroup: React.FC<ISearchGroupProps> = props => {
    const {searchBarHintText, onSearch} = props;

    const onSearchBarSearched = (query: string) => {

    }

    return (
        <div>
            {/* <SearchBar hintText={searchBarHintText} onSearch={(q) => onSearchBarSearched(q)} /> */}
        </div>
    )
}

const SearchGroup: React.FC<ISearchGroupProps> = props => {
    return (
        <div></div>
        // <DisconnectedSearchGroup />
    )
}

export default SearchGroup;