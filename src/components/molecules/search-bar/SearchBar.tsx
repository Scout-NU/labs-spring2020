import React from 'react';
import searchicon from '../../../images/global/search.svg';
import closebutton from '../../../images/global/closebutton.svg';
import { Form } from '@unform/web';
import { SubmitHandler, FormHandles } from '@unform/core';
import { SearchWrapper, SearchBarGroup, SubmitButton, SearchIcon, SearchInput, SearchSuggestionsContainer, SearchSuggestionsPopover, SearchSuggestions, SearchSuggestion, CloseButton } from './styled';


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
    const queryFieldName = 'query';

    const onSubmit: SubmitHandler<SearchBarData> = (data) => {
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
                        defaultValue={props.startQuery}
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