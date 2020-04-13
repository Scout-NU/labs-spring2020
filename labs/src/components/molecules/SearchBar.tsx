import React from 'react';
import styled from '../../theme/Theme';
import { lunchboxColors } from '../../theme/lunchbox';
import searchicon from '../../images/global/search.svg';
import closebutton from '../../images/global/closebutton.svg';
import { Form } from '@unform/web';
import { SubmitHandler, FormHandles } from '@unform/core';
import Input from '../atoms/Input';
import { A } from '../atoms/Typography';


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
// TODO: Create a global style for "clickables"
const SearchIcon = styled.img`
    width: max(3%, 40px);
    padding-right: 1em;

    transition: all .1s ease-in-out;
    

    &:hover {
        transform: scale(1.1);
    }

    &:active {
        transition: all 0s ease-in-out;
        transform: scale(1);
    }
`

const SearchInput = styled(Input)`
    background-color: ${lunchboxColors.gusher};
    font-family: ${props => props.theme.typography.fontFamily};
    border: none;
    color: white;
    font-size: ${props => props.theme.typography.h5.fontMax};
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
    padding: 0;
    margin: 0;
    
    & li:not(:last-child) {
        margin-bottom: 1em;
    }
`

const SearchSuggestion = styled(A)`
    font-weight: normal;
    color: ${lunchboxColors.gusher};
`

const SubmitButton = styled.button`
    border: none;
    background-color: transparent;
    padding: 0;
   

    &:focus {
        outline: none;
    }
`

const SearchWrapper = styled.div`
    width: 100%;
`

interface ISearchBarProps {
    hintText: string;
    suggestionTitle?: string;
    searchSuggestions: string[];
    startQuery: string;
    onSearch: (query: string) => void;
    onQueryContentsChanged: (currentContents: string) => void;
}

interface SearchBarData {
    query: string;
}

const SearchBar: React.FC<ISearchBarProps> = props => {
    const [showSuggestions, toggleSuggestions] = React.useState(false);
    const formRef = React.useRef<FormHandles>(null);
    const [query, setQuery] = React.useState(props.startQuery);
    const queryFieldName = 'query';

    const onSubmit: SubmitHandler<SearchBarData> = (data) => {
        console.log("search")
        props.onSearch(data.query);
    };

    const onClear = () => {
        formRef.current?.clearField(queryFieldName);
    }

    const addSuggestion = (suggestion: string) => {
        let current = formRef.current;

        if (current) {
            let value = current.getFieldValue(queryFieldName);
            current.setFieldValue(queryFieldName, `${value} ${suggestion}`);
        }
    }

    const onCharacterEntered = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.onQueryContentsChanged(e.target.value);
    }

    return (
        <SearchWrapper>
            <Form ref={formRef} onSubmit={onSubmit}>
                <SearchBarGroup>
                    <SubmitButton type='submit'>
                        <SearchIcon src={searchicon}/>
                    </SubmitButton>
                    <SearchInput 
                        autoComplete='off'
                        onFocus={() => toggleSuggestions(true)}
                        onBlur={() => toggleSuggestions(false)}
                        onChange={(e) => onCharacterEntered(e)}
                        name={queryFieldName}
                        type='text'
                        placeholder={props.hintText}
                        defaultValue={query}
                    />
                    <CloseButton src={closebutton} onClick={() => onClear()}/>
                </SearchBarGroup>

                { showSuggestions && 
                    <SearchSuggestionsContainer>
                        <SearchSuggestionsPopover>
                            <SearchSuggestions>
                                { props.searchSuggestions.map((value, i) => <li onMouseDown={() => addSuggestion(value)} key={i}> <SearchSuggestion> {value} </SearchSuggestion> </li> )}
                            </SearchSuggestions>
                        </SearchSuggestionsPopover>
                    </SearchSuggestionsContainer>
                }

            </Form>
        </SearchWrapper>
    )
}

export default SearchBar;