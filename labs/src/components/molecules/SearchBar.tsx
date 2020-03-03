import React from 'react';
import styled from '../../theme/Theme';
import { lunchboxColors } from '../../theme/lunchbox';
import searchicon from '../../images/global/search.svg';
import closebutton from '../../images/global/closebutton.svg';
import { Form } from '@unform/web';
import { SubmitHandler, FormHandles } from '@unform/core';
import Input from '../atoms/Input';


const SearchBarGroup = styled.div`
    display: flex;
    flex-direction: row;
    background-color: ${lunchboxColors.gusher};
    padding: 1.25em;
    justify-content: space-between;
    align-items: center;
`

const CloseButton = styled.img`
    display: flex;
    width: max(2%, 22px);
    transition: all .2s ease-in-out;

    &:hover {
        transform: scale(1.1);
    }
`

const SearchIcon = styled.img`
    width: max(3%, 40px);
    padding-right: 1em;
`

const SearchInput = styled(Input)`
    background-color: ${lunchboxColors.gusher};
    font-family: ${props => props.theme.typography.fontFamily};
    border: none;
    color: white;
    font-size: ${props => props.theme.typography.p.fontMax};
    width: 100%;

    &::placeholder {
        color: white;
    }

    &:focus {
        outline: none;
    }
`

const SearchBar: React.FC = () => {
    return (
        <DisconnectedSearchBar 
            suggestionTitle={'Common Topic Areas'}
            searchSuggestions={[]} 
            hintText='Search by topic or name'
            onSearch={() => console.log('search')}
        />
    )
}

interface ISearchBarProps {
    hintText: string;
    suggestionTitle?: string;
    searchSuggestions: string[];
    onSearch: (query: string) => void;
}

interface SearchBarData {
    query: string;
}

const DisconnectedSearchBar: React.FC<ISearchBarProps> = props => {
    const [showSuggestions, toggleSuggestions] = React.useState(false);
    const [displayedSuggestions, setSuggestions] = React.useState(props.searchSuggestions); 
    const formRef = React.useRef<FormHandles>(null);

    const onSubmit: SubmitHandler<SearchBarData> = (data) => {
        props.onSearch(data.query);
    };

    const onClear = () => {
        formRef.current?.clearField('query');
    }

    return (
        <Form ref={formRef} onSubmit={onSubmit}>
            <SearchBarGroup>
                <SearchIcon src={searchicon}/>
                <SearchInput 
                    name='query'
                    type='text'
                    placeholder={props.hintText}
                />
                <CloseButton src={closebutton} onClick={() => onClear()}/>
            </SearchBarGroup>
        </Form>
    )
}

export default SearchBar;