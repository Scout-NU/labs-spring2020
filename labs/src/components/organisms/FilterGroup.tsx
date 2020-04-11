import React from 'react';
import styled from '../../theme/Theme';
import Button, { StyledButton, ButtonStyle } from '../atoms/Button';
import { Row, Col } from 'react-flexbox-grid';
import { IFilter } from '../../types/client/client';
import Input from '../atoms/Input';
import SearchFilter from '../molecules/SearchFilter';
import { Form} from '@unform/web';
import { SubmitHandler, FormHandles } from '@unform/core';
import { P } from '../atoms/Typography';
import { StyledFilterPopup } from '../molecules/FilterPopup';
import { lunchboxColors } from '../../theme/lunchbox';

interface IFilterGroupProps {
    filters: IFilter[];
    onSelectedFiltersChanged: (filters: IFilter[]) => void;
}


const FilterOption = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const CheckLabel = styled(P)`
    display: inline-block;
    margin-left: .5em;
`

const FilterWrapper = styled(Row)`
    margin-top: 1em;
    
    & > ${StyledFilterPopup} {
        margin-right: 1em;
    }
`

const ClearButton = styled(StyledButton)`
    position: relative;
    bottom: 0;
    width: 50%;
    background-color: transparent;

    &:hover {
        transform: none;
        background-color: ${lunchboxColors.egg};
        color: black;
    }
`

interface IFilterGroupState {
    filters: IFilter[];
}

class FilterGroup extends React.Component<IFilterGroupProps, IFilterGroupState> {
    constructor(props: IFilterGroupProps) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onFilterChanged = this.onFilterChanged.bind(this);
        this.buildOption = this.buildOption.bind(this);

        this.state = {
            filters: props.filters.map((filter) => { return {...filter, filterOptions: [] }})
        }
    }
    
    onSubmit() {
        this.props.onSelectedFiltersChanged(this.state.filters)
    }

    onFilterChanged(e: React.ChangeEvent<HTMLInputElement>) {
        let filterId = e.target.name;
        let value = e.target.value;
        let currentFilters = this.state.filters;

        let newFilters = currentFilters.map((filter) => {
                    if (filter.id === filterId) {
                        let options = filter.filterOptions;
                        return {
                            ...filter,
                            filterOptions: options.includes(value) ? options.filter((v) => v !== value) : [...options, value]
                        }
                    }

                    return filter
                })
        
        this.setState({filters: newFilters});
    }

    buildOption(filterId: string, option: string, key: number) {
        return (
            <FilterOption key={key} >
                {/* TODO: Check mark isn't showing up */}
                <Input type='checkbox' name={filterId} value={option} onChange={(e) => this.onFilterChanged(e)}/> 
                <CheckLabel>{option}</CheckLabel>
            </FilterOption>                     
        )
    }

    render() {
        return (
            <Form onSubmit={this.onSubmit}>     
                <FilterWrapper center='xs' middle='xs' start='lg'>
                    { this.props.filters.map((filter, i) => {
                        return (
                            <Col key={i} xs={6} lg={3}>
                                <SearchFilter title={filter.filterName}>
                                    {filter.filterOptions.map((option, key) => this.buildOption(filter.id, option, key))}
                                </SearchFilter>
                            </Col>
                        )
                    })}
                    <Col xs={12} lg={3}>
                        <ClearButton buttonStyle={ButtonStyle.CLEAR} onClick={() => console.log("Clear the filters.")}>
                            Clear Filters
                        </ClearButton>
                    </Col>
                </FilterWrapper>
            </Form> 
        )
    }
}


export default FilterGroup;