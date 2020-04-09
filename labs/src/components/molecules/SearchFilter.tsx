import React from 'react';
import styled from '../../theme/Theme';
import { IFilter } from '../../types/client/client';
import Input from '../atoms/Input';
import { lunchboxColors } from '../../theme/lunchbox';
import { Form} from '@unform/web';
import { SubmitHandler, FormHandles } from '@unform/core';
import { P } from '../atoms/Typography';
import FilterPopup from './FilterPopup';
import { ButtonStyle, StyledButton } from '../atoms/Button';

interface IExpandableSearchFilterProps {
    filter: IFilter;
    onFiltersSelected: (filters: string[]) => void;
}

const CheckLabel = styled(P)`
    display: inline-block;
    margin-left: .5em;
`


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

const FilterOption = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
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


const SearchFilter: React.FC<IExpandableSearchFilterProps> = props => {
    const { filter } = props;
    const formRef = React.useRef<FormHandles>(null);
    // TODO: Checkboxes and unform apparently don't mix. Going to pull out state...
    const [selectedFilters, setSelectedFilters] = React.useState<string[]>([]);

    const onSubmit: SubmitHandler = (data) => {    
        console.log(selectedFilters)
    };

    const onFilterChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        let current = formRef.current

        if (current) {
            let name = e.target.name;
            if (selectedFilters.find((f) => f === name)) {
                setSelectedFilters(selectedFilters.filter((f) => f !== name))
            } else {
                setSelectedFilters([...selectedFilters, name])
            }
        }
    }

    const buildOption = (option: string, key: number) => {
        return (
            <FilterOption key={key} >
                {/* TODO: Check mark isn't showing up */}
                {/* TODO: For the most arcane reason this starts as "on" and I don't know why. */}
                <Input type='checkbox' name={option} onChange={(e) => onFilterChanged(e)}/> 
                <CheckLabel>{option}</CheckLabel>
            </FilterOption>                     
        )
    }

    const buildOptions = () => {
        let columnHeight = 8;
        let filterOptions = filter.filterOptions.map((option, i) => buildOption(option, i));
        let columns: JSX.Element[] = []

        for (var i = 0; i < filterOptions.length; i += columnHeight) {            
            columns.push(
                <FilterColumn key={i}>
                    {filterOptions.slice(i, i + columnHeight)}
                </FilterColumn>
            )
        }        

        return columns;
    }

    return (
        <Form ref={formRef} onSubmit={onSubmit} name={`${filter.filterName}-form`}>     
            <FilterPopup filterTitle={filter.filterName}>
                <FilterWrapper>
                    <FilterOptions>
                        {buildOptions()}
                    </FilterOptions>
                    <ApplyButton type='submit'> Apply Filters </ApplyButton>
                </FilterWrapper>
            </FilterPopup>
        </Form> 
    )
}

export default SearchFilter;