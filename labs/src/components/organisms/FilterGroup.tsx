import React from 'react';
import styled from '../../theme/Theme';
import FilterPopup, { StyledFilterPopup } from '../molecules/FilterPopup';
import Button, { ButtonStyle } from '../atoms/Button';
import { Row, Col } from 'react-flexbox-grid';
import { IFilter } from '../../types/client/client';

import SearchFilter from '../molecules/SearchFilter';


interface IFilterGroupProps {
    filters: IFilter[];
    onSelectedFiltersChanged: (issueFilters: string[], departmentFilters: string[]) => void;
}

const FilterWrapper = styled(Row)`
    margin-top: 1em;

    & > ${StyledFilterPopup} {
        margin-right: 1em;
    }
`

const ClearButton = styled(Button)`
    background-color: transparent;
`

// TODO: Could make this dynamic, where filters are completely fetched. That will take some time and I am not going to do that right now.
const FilterGroup: React.FC<IFilterGroupProps> = props => {

    return (
        <FilterWrapper start='xs' middle='xs'>
            {props.filters.map((filter, i) => {
                return (
                    <Col key={i} xs={2}>
                        <SearchFilter filter={filter} onFiltersSelected={(v) => console.log(v)}/>
                    </Col>
                )
            })}
            <Col xs={2}>
                <ClearButton buttonStyle={ButtonStyle.CLEAR} onClick={() => console.log("Clear the filters.")}>Clear Filters</ClearButton>
            </Col>
        </FilterWrapper>
    )
}

interface ISearchGroupProps {

}

export const SearchGroup: React.FC<ISearchGroupProps> = props => {
    return (
        <div></div>
    )
}

export default FilterGroup;