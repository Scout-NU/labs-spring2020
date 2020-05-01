import styled from '../../../styles/theme/Theme';
import { lunchboxColors } from '../../../styles/theme/lunchbox';
import devices from '../../../styles/variables/breakpoints';

export const StyledFilterPopup = styled.div`
    background-color: ${lunchboxColors.gusher};
    font-weight: bold;
    color: white;
    display: flex;
    justify-content: space-between;
    padding: 1.25em;
    user-select: none;
    transition: all .2s ease-in-out;
    overflow: scroll;

    &:hover {
        color: black;
        background-color: ${lunchboxColors.egg};
    }

    & * {
        margin: 0;
    }
`

export const PopupWrapper = styled.div`
    position: absolute;
    z-index: 999;

    @media ${devices.tablet} {
        width: 100%;
        left: 0;
        width: 100%;
    }
`