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


// TODO: Could make this dynamic, where filters are completely fetched. That will take some time and I am not going to do that right now.
const FilterGroup: React.FC<IFilterGroupProps> = props => {
    const initializeFilters = (): Map<string, string[]> => {
        let filters = new Map<string, string[]>();
        props.filters.forEach((f) => filters.set(f.id, []));
        return filters;
    }

    const formRef = React.useRef<FormHandles>(null);
    const initializedMap = initializeFilters()
    const [selectedFilters, setSelectedFilters] = React.useState<Map<string, string[]>>(new Map());

    // React.useEffect(() => {
    //     setSelectedFilters(initializedMap)
    // }, [initializedMap]);

    // console.log(selectedFilters)
    const onSubmit: SubmitHandler = (e) => {
        console.log()
        // props.onFiltersSelected(selectedFilters)
    };

    const onFilterChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        let current = formRef.current
        console.log(selectedFilters)

        if (current) {
            let filterId = e.target.name;
            let value = e.target.value;
            let selected = selectedFilters.get(filterId);

            if (selected) {
                if (selected.includes(value))  {
                    setSelectedFilters(new Map(selectedFilters).set(filterId, selected.filter((v) => v !== value))) 
                } else {
                    setSelectedFilters(new Map(selectedFilters).set(filterId, [...selected, value]))
                }
            }
            console.log(selectedFilters)
        }
    }


    const clearFilters = () => {
        // formRef.current?.reset();
        // setSelectedFilters([]);
        // formRef.current?.submitForm();
    }

    const buildOption = (filterId: string, option: string, key: number) => {
        return (
            <FilterOption key={key} >
                {/* TODO: Check mark isn't showing up */}
                <Input type='checkbox' name={filterId} value={option} onChange={(e) => onFilterChanged(e)}/> 
                <CheckLabel>{option}</CheckLabel>
            </FilterOption>                     
        )
    }

    return (
        <Form ref={formRef} onSubmit={onSubmit}>     
            <FilterWrapper center='xs' middle='xs' start='lg'>
                { props.filters.map((filter, i) => {
                    return (
                        <Col key={i} xs={6} lg={3}>
                            <SearchFilter title={filter.filterName}>
                                {filter.filterOptions.map((option, key) => buildOption(filter.id, option, key))}
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


export default FilterGroup;