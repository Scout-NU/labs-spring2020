import React from 'react';
import styled from '../../theme/Theme';
import { lunchboxColors } from '../../theme/lunchbox';

interface IPopupProps {
    show: boolean;
}

const StyledPopup = styled.div<IPopupProps>`
    display: ${props => props.show ? 'initial' : 'none' };
    background-color: ${lunchboxColors.carton};
`

export const Popup: React.FC<IPopupProps> = props => {
    return (
        <StyledPopup show={props.show}>{props.children}</StyledPopup>
    )
}

export default Popup;