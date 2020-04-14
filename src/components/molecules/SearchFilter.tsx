import React from 'react';
import styled from '../../theme/Theme';
import { lunchboxColors } from '../../theme/lunchbox';
import FilterPopup from './FilterPopup';


interface ISearchFilterProps {
    title: string;
}

const FilterColumn = styled.div`
    display: flex;
    flex-direction: column;
`

const FilterWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

const FilterOptions = styled.div`
    display: flex;
    flex-direction: row;
    background-color: ${lunchboxColors.carton};
    padding: 3em;

    & ${FilterColumn} {
        margin-right: 8em;
    }

    & ${FilterColumn}:last-child {
        margin-right: 0;
    }
`

const ApplyButton = styled.button`
    font-family: ${props => props.theme.typography.fontFamily };
    color: white;
    position: relative;
    bottom: 0;
    width: 100%;
    border: none;
    background-color: ${lunchboxColors.salad};
    padding: 1em 3.5em;
    text-transform: upcase;
    font-size: 16px;
    font-weight: bolder;

    transition: all .1s ease-in-out;

    &:focus {
        outline: none;
    }

    &:hover {
        transform: none;
        background-color: ${lunchboxColors.egg};
        color: black;
    }
`

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