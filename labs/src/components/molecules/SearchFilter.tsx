import React from 'react';
import styled from '../../theme/Theme';
import { IFilter } from '../../types/client/client';
import Input from '../atoms/Input';
import { lunchboxColors } from '../../theme/lunchbox';
import { Form, SubmitHandler } from '@unform/core';
import { P } from '../atoms/Typography';
import FilterPopup from './FilterPopup';

interface IExpandableSearchFilterProps {
    filter: IFilter;
    onFiltersSelected: (filters: string[]) => void;
}

const CheckLabel = styled(P)`
    display: inline-block;
    margin-left: .5em;
`

const FilterOptions = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${lunchboxColors.carton};
    padding: 1em;
`

const FilterOption = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const SearchFilter: React.FC<IExpandableSearchFilterProps> = props => {
    const { filter } = props;

    const onSubmit: SubmitHandler = (data: any) => {
        // props.onSearch(data.query);
    };

    return (
        <Form onSubmit={onSubmit} name={`${filter.filterName}-form`}>     
            <FilterPopup filterTitle={filter.filterName}>
                <FilterOptions>
                    {filter.filterOptions.map((option, i) => {
                        return (
                            <FilterOption>
                                {/* TODO: Check mark isn't showing up */}
                                <Input key={i} type='checkbox' name={option}/> 
                                <CheckLabel>{option}</CheckLabel>
                            </FilterOption>                     
                        )
                    })}
                </FilterOptions>
            </FilterPopup>
        </Form> 
    )
}

export default SearchFilter;