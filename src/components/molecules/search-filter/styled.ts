import styled from '../../../styles/theme/Theme';
import { lunchboxColors } from '../../../styles/theme/lunchbox';
import devices from '../../../styles/variables/breakpoints';

export const FilterColumn = styled.div`
    display: flex;
    flex-direction: column;
`

export const FilterWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

export const FilterOptions = styled.div`
    display: flex;
    flex-direction: row;
    background-color: ${lunchboxColors.carton};
    padding: 3em;

    & ${FilterColumn} {
        margin-right: 8em;
    }

    & ${FilterColumn}:last-child {
        margin-right: 0;
    }
    
    @media ${devices.tablet} {
        flex-direction: column;

        & ${FilterColumn} {
            margin: 0;
        }
    }
`

export const ApplyButton = styled.button`
    font-family: ${props => props.theme.typography.fontFamily };
    color: white;
    position: relative;
    bottom: 0;
    width: 100%;
    border: none;
    background-color: ${lunchboxColors.salad};
    padding: 1em 3.5em;
    text-transform: upcase;
    font-size: 16px;
    font-weight: bolder;

    transition: all .1s ease-in-out;

    &:focus {
        outline: none;
    }

    &:hover {
        transform: none;
        background-color: ${lunchboxColors.egg};
        color: black;
    }
`