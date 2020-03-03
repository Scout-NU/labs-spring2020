import React from 'react';
import styled from '../../theme/Theme';
import { lunchboxColors } from '../../theme/lunchbox';
import searchicon from '../../images/global/search.svg';
import closebutton from '../../images/global/closebutton.svg';
import { Form } from '@unform/web';
import { SubmitHandler, FormHandles } from '@unform/core';
import Input from '../atoms/Input';
import { NavigationLink } from '../atoms/Typography';


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

const SearchSuggestionsContainer = styled.div`
    position: relative;
`

const SearchSuggestionsPopover = styled.div`
    position: absolute;
    width: 100%;
    border: 2px solid ${lunchboxColors.gusher};
    padding: 1.5em;
    background-color: white;
    text-align: left;
    z-index: 1;
`

const SearchSuggestions = styled.ul`
    list-style-type: none;
    color: ${lunchboxColors.gusher};
    font-weight: lighter;
    padding: 0;
    margin: 0;
    

    & li:not(:last-child) {
        margin-bottom: 1em;
    }
`

const SearchBar: React.FC = () => {
    return (
        <DisconnectedSearchBar 
            suggestionTitle={'Common Topic Areas'}
            searchSuggestions={['hi', 'bye']} 
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
                    onFocus={() => toggleSuggestions(true)}
                    onBlur={() => toggleSuggestions(false)}
                    name='query'
                    type='text'
                    placeholder={props.hintText}
                />
                <CloseButton src={closebutton} onClick={() => onClear()}/>
            </SearchBarGroup>

            {showSuggestions && <SearchSuggestionsContainer>
                <SearchSuggestionsPopover>
                    <SearchSuggestions>
                        {props.searchSuggestions.map((value, i) => {
                            return (
                                <li>
                                    <NavigationLink>
                                        {value}
                                    </NavigationLink>
                                </li>
                            )
                        })}
                    </SearchSuggestions>
                </SearchSuggestionsPopover>
            </SearchSuggestionsContainer>}

        </Form>
    )
}

export default SearchBar;