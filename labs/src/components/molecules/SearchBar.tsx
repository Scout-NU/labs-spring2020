import React from 'react';
import styled from '../../theme/Theme';
import { lunchboxColors } from '../../theme/lunchbox';
import searchicon from '../../images/global/search.svg';
import closebutton from '../../images/global/closebutton.svg';


interface ISearchBarProps {

}

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
    width: 2%;
    transition: all .2s ease-in-out;

    &:hover {
        transform: scale(1.1);
    }
`

const SearchIcon = styled.img`
    width: 3%;
    padding-right: 1em;
`

const SearchInput = styled.input`
    background-color: ${lunchboxColors.gusher};
    font-family: ${props => props.theme.typography.fontFamily};
    border: none;
    color: white;
    font-size: ${props => props.theme.typography.p.fontMax};
    width: 100%;

    &::placeholder {
        color: white;
    }
`

const SearchBar: React.FC<ISearchBarProps> = props => {
    return (
        <form>
            <SearchBarGroup>
                <SearchIcon src={searchicon}/>
                <SearchInput type='text' placeholder='Search by topic or name'/>
                <CloseButton src={closebutton}/>
            </SearchBarGroup>
        </form>
    )
}

export default SearchBar;