import React from 'react';
import styled from '../../theme/Theme';
import Button, { StyledButton, ButtonStyle } from '../atoms/Button';
import { Row, Col } from 'react-flexbox-grid';
import { IFilter } from '../../types/client/client';
import SearchFilter from '../molecules/SearchFilter';
import { P } from '../atoms/Typography';
import { StyledFilterPopup } from '../molecules/FilterPopup';
import { lunchboxColors } from '../../theme/lunchbox';
import { StyledCheckbox } from '../atoms/Input';

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
    background-color: transparent;
`

interface IFilterGroupState {
    filters: IFilter[];
}

class FilterGroup extends React.Component<IFilterGroupProps, IFilterGroupState> {
    private inputRefs: (HTMLInputElement | null)[];

    constructor(props: IFilterGroupProps) {
        super(props);
        this.inputRefs = [];
        this.state = {
            filters: this.baseState(props.filters)
        }
    }

    baseState = (baseFilters: IFilter[]): IFilter[] => {
        return baseFilters.map((filter) => { return {...filter, filterOptions: [] }})
    }
    
    onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        this.props.onSelectedFiltersChanged(this.state.filters)
    }

    onFilterChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    buildOption = (filterId: string, option: string, key: number) => {
        return (
            <FilterOption key={key} >
                {/* TODO: Check mark isn't showing up */}
                <StyledCheckbox>
                    <input ref={e => this.inputRefs = [...this.inputRefs, e]} type='checkbox' name={filterId} value={option} onChange={(e) => this.onFilterChanged(e)}/> 
                </StyledCheckbox>
                <CheckLabel>{option}</CheckLabel>
            </FilterOption>                     
        )
    }

    clearFilters = () => {
        this.inputRefs.forEach((ref) => { if (ref) ref.checked = false });
        this.setState({filters: this.baseState(this.props.filters)});
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
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
                        <ClearButton buttonStyle={ButtonStyle.CLEAR} onClick={this.clearFilters}>
                            Clear Filters
                        </ClearButton>
                    </Col>
                </FilterWrapper>
            </form>
        )
    }
}


export default FilterGroup;