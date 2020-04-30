import React from 'react';
import { Col } from 'react-flexbox-grid';
import SearchFilter from '../../molecules/search-filter/SearchFilter';
import { IFilter } from '../../../types/client/page/search';
import { FilterOption, CheckLabel, ClearButton, FilterWrapper } from './styled';
import { StyledCheckbox } from '../../atoms/input/styled';
import { ButtonStyle } from '../../atoms/button/styled';

interface IFilterGroupProps {
    filters: IFilter[];
    onSelectedFiltersChanged: (filters: IFilter[]) => void;
}

interface IFilterGroupState {
    filters: IFilter[];
}

/**
 * This component shows a series of filters in a row. It tracks which options are selected within each of those filters, and performs a callback every
 * time there is a change. 
 */
class FilterGroup extends React.Component<IFilterGroupProps, IFilterGroupState> {
    private inputRefs: (HTMLInputElement | null)[];

    constructor(props: IFilterGroupProps) {
        super(props);
        this.inputRefs = [];
        this.state = {
            filters: props.filters
        }
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
                        let selected = filter.selectedFilters;
                        return {
                            ...filter,
                            selectedFilters: selected.includes(value) ? selected.filter((v) => v !== value) : [...selected, value]
                        }
                    }

                    return filter
                })
        this.setState({filters: newFilters});
    }

    buildOption = (filterId: string, option: string, key: number, selected: boolean) => {
        return (
            <FilterOption key={key} >
                {/* TODO: Check mark isn't showing up */}
                <StyledCheckbox>
                    <input 
                        ref={e => this.inputRefs = [...this.inputRefs, e]} 
                        checked={selected} 
                        type='checkbox' 
                        name={filterId}
                        value={option} 
                        onChange={(e) => this.onFilterChanged(e)}
                    /> 
                </StyledCheckbox>
                <CheckLabel>{option}</CheckLabel>
            </FilterOption>                     
        )
    }

    clearFilters = () => {
        this.inputRefs.forEach((ref) => { if (ref) ref.checked = false });
        this.setState(
            { filters: this.state.filters.map(filter => {return {...filter, selectedFilters: []}}) }, 
            () => this.props.onSelectedFiltersChanged(this.state.filters));
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <FilterWrapper center='xs' middle='xs' start='lg'>
                    { this.state.filters.map((filter, i) => {
                        return (
                            <Col key={i} xs={6} lg={3}>
                                <SearchFilter title={filter.filterName}>
                                    {filter.filterLabels.map((option, key) => this.buildOption(filter.id, option, key, filter.selectedFilters.includes(option)))}
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