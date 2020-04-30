import styled from '../../../styles/theme/Theme';
import { lunchboxColors } from '../../../styles/theme/lunchbox';
import Input from '../../atoms/input/Input';
import { A } from '../../atoms/typography/Typography';

export const SearchBarGroup = styled.div`
    display: flex;
    flex-direction: row;
    background-color: ${lunchboxColors.gusher};
    padding: 1.25em;
    justify-content: space-between;
    align-items: center;
`

export const CloseButton = styled.img`
    display: flex;
    width: max(2%, 22px);
    transition: all .2s ease-in-out;

    &:hover {
        transform: scale(1.1);
    }
`
// TODO: Create a global style for "clickables"
export const SearchIcon = styled.img`
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

export const SearchInput = styled(Input)`
    background-color: ${lunchboxColors.gusher};
    font-family: ${props => props.theme.typography.fontFamily};
    border: none;
    color: white;
    font-size: ${props => props.theme.typography.h5.fontMax};
    width: 100%;
    min-height: 0;
    padding: 0;

    &::placeholder {
        color: white;
    }

    &:focus {
        outline: none;
    }
`

export const SearchSuggestionsContainer = styled.div`
    position: relative;
`

export const SearchSuggestionsPopover = styled.div`
    position: absolute;
    width: 100%;
    border: 2px solid ${lunchboxColors.gusher};
    padding: 1.5em;
    background-color: white;
    text-align: left;
    z-index: 1;
`

export const SearchSuggestions = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
    
    & li:not(:last-child) {
        margin-bottom: 1em;
    }
`

export const SearchSuggestion = styled(A)`
    font-weight: normal;
    color: ${lunchboxColors.gusher};
`

export const SubmitButton = styled.button`
    border: none;
    background-color: transparent;
    padding: 0;
   

    &:focus {
        outline: none;
    }
`

export const SearchWrapper = styled.div`
    width: 100%;
`