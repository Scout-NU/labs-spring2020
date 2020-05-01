import React from 'react';
import Popup from '../../atoms/popup/Popup';
import { H5 } from '../../atoms/typography/Typography';
import { StyledFilterPopup, PopupWrapper } from './styled';


interface IFilterPopupProps {
    filterTitle: string;
}

const FilterPopup: React.FC<IFilterPopupProps> = props => {
    const [showPopup, togglePopup] = React.useState(false);

    return (
        <>
            <StyledFilterPopup onClick={() => togglePopup(!showPopup)}>
                <H5>{props.filterTitle}</H5>
                <H5>{showPopup ? '-' : '+'}</H5>
            </StyledFilterPopup>
            <PopupWrapper>
                <Popup show={showPopup}>{props.children}</Popup>
            </PopupWrapper>
        </>
    )
}

export default FilterPopup;