import styled from '../../../styles/theme/Theme';
import { lunchboxColors } from '../../../styles/theme/lunchbox';


export interface IPopupProps {
    show: boolean;
}

export const Popup = styled.div<IPopupProps>`
    display: ${props => props.show ? 'initial' : 'none' };
    background-color: ${lunchboxColors.carton};
`

export default Popup;