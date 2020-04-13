import React from 'react';
import styled from '../../theme/Theme';
import { lunchboxColors } from '../../theme/lunchbox';
import Popup from '../atoms/Popup';
import { H5 } from '../atoms/Typography';


interface IFilterPopupProps {
    filterTitle: string;
}

export const StyledFilterPopup = styled.div`
    background-color: ${lunchboxColors.gusher};
    font-weight: bold;
    color: white;
    display: flex;
    justify-content: space-between;
    padding: 1.25em;
    user-select: none;
    transition: all .2s ease-in-out;

    &:hover {
        color: black;
        background-color: ${lunchboxColors.egg};
    }

    & * {
        margin: 0;
    }
`

const PopupWrapper = styled.div`
    position: absolute;
    z-index: 999;
`

const FilterPopup: React.FC<IFilterPopupProps> = props => {
    const [showPopup, togglePopup] = React.useState(false);

    return (
        <div>
            <StyledFilterPopup onClick={() => togglePopup(!showPopup)}>
                <H5>{props.filterTitle}</H5>
                <H5>{showPopup ? '-' : '+'}</H5>
            </StyledFilterPopup>
            <PopupWrapper>
                <Popup show={showPopup}>{props.children}</Popup>
            </PopupWrapper>
        </div>
    )
}

export default FilterPopup;