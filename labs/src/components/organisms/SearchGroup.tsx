import React from 'react';
import SearchBar from '../molecules/SearchBar';
import { Col, Row } from 'react-flexbox-grid';
import FilterGroup from './FilterGroup';
import { IFilter } from '../../types/client/client';
import useProblemTagService from '../../state/problem-tags/service';
import useDepartmentService from '../../state/department/service';
import { IProblemTag, IDepartment } from '../../types/cms/generated';
import { v4 as uuidv4 } from 'uuid';

// TODO: add individual callbacks for filters and querying
interface ISearchGroupProps {
    searchSuggestions: string[];
    searchBarHintText: string;
    filters: IFilter[];
    onSearch: (query: string, tagFilters: string[], departmentFilters: string[]) => void;
}


const DisconnectedSearchGroup: React.FC<ISearchGroupProps> = props => {
    const {searchBarHintText, onSearch} = props;

    const onSearchBarSearched = (query: string) => {

    }

    const onQueryContentsChanged = (value: string) => {
        console.log(value)
    }

    const onFiltersChanged = (issues: string[], departments: string[]) => {

    }

    return (
        <Row>
            <Col xs={12}>
                <SearchBar
                    searchSuggestions={props.searchSuggestions} 
                    hintText={searchBarHintText} 
                    onQueryContentsChanged={(v) => onQueryContentsChanged(v)} 
                    onSearch={(q) => onSearchBarSearched(q)}
                />
        
                <FilterGroup 
                    filters={props.filters}
                    onSelectedFiltersChanged={(filters) => console.log("logging disss")}
                />
            </Col>
        </Row>
    )
}

const SearchGroup: React.FC = props => {
    const [suggestions, setSuggestions] = React.useState<string[]>(['Climate Change', 'Gun Control', 'Mental Health', 'Affordable Housing']);
    const [filters, setFilters] = React.useState<IFilter[]>([]);
    const [loading, setLoading] = React.useState(true);
    const tagService = useProblemTagService();
    const departmentService = useDepartmentService();
    
    React.useEffect(() => {
        async function getFilters() {
            // TODO: if one of these fails, does everything fail?
           Promise.all([tagService.getAllProblemTags(), departmentService.getAllDepartments()])
           .then(res => {
               let [tags, departments] = res;
               setFilters([...filters, resolveTagFilters(tags), resolveDepartmentFilters(departments)])
               setLoading(false);
            })
           .catch(error => console.log(error))
        }

        getFilters();
    }, []);
    
    const resolveTagFilters = (items: IProblemTag[]): IFilter => {
        let filterOptions: string[] = []
        items.forEach((item) => { if (item.fields.tagName) filterOptions.push(item.fields.tagName) })
        return {
            filterName: 'Topics',
            filterOptions: filterOptions,
            id: uuidv4()
        };
    }

    const resolveDepartmentFilters = (items: IDepartment[]): IFilter => {
        let filterOptions: string[] = []
        items.forEach((item) => { if (item.fields.departmentName) filterOptions.push(item.fields.departmentName)})
        return {
            filterName: 'Departments',
            filterOptions: filterOptions,
            id: uuidv4()
        };
    }

    if (loading) {
        return (<div>...loading</div>)
    }

    return (
        <DisconnectedSearchGroup 
            searchSuggestions={suggestions}
            searchBarHintText={'Search by topic or name'}
            onSearch={() => console.log("woo")}
            filters={filters}
        />
    )
}

export default SearchGroup;