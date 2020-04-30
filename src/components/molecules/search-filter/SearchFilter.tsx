import React from 'react';
import FilterPopup from '../filter-popup/FilterPopup';
import { FilterColumn, FilterWrapper, FilterOptions, ApplyButton } from './styled';


interface ISearchFilterProps {
    title: string;
}


const SearchFilter: React.FC<ISearchFilterProps> = props => {  
    const buildOptions = () => {
        let columnHeight = 8;
        let filterOptions = React.Children.toArray(props.children);
        let columns: JSX.Element[] = [];

        for (var i = 0; i < filterOptions.length; i += columnHeight) {            
            columns.push(
                <FilterColumn key={i}>
                    {filterOptions.slice(i, i + columnHeight)}
                </FilterColumn>
            );
        }
        return columns;
    }

    return (
        <FilterPopup filterTitle={props.title}>
            <FilterWrapper>
                <FilterOptions>
                    {buildOptions()}
                </FilterOptions>
                <ApplyButton type='submit'> Apply Filters </ApplyButton>
            </FilterWrapper>
        </FilterPopup>
    )
}

export default SearchFilter;