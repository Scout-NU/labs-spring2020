import styled from '../../../styles/theme/Theme';
import { lunchboxColors } from '../../../styles/theme/lunchbox';
import { ModalBackgroundFade } from '../modal/styled';
import { StyledSpinner } from '../../atoms/spinner/Spinner';

export const LoaderWrapper = styled(ModalBackgroundFade)`
    background-color: white;
    opacity: 1;
 `

export const SpinnerWrapper = styled.div`
    & ${StyledSpinner} div {
        background: ${lunchboxColors.soymilk};
    }
`