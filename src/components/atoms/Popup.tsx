import React from 'react';
import styled from '../../styles/theme/Theme';
import { lunchboxColors } from '../../styles/theme/lunchbox';

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