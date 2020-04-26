import React from 'react';
import Spinner, {StyledSpinner} from '../atoms/Spinner';
import Modal, {IModalProps, ModalBackgroundFade} from '../atoms/Modal';
import styled from '../../styles/theme/Theme';
import { lunchboxColors } from '../../styles/theme/lunchbox';

const LoaderWrapper = styled(ModalBackgroundFade)`
    background-color: white;
    opacity: 1;
 `

const SpinnerWrapper = styled.div`
    & ${StyledSpinner} div {
        background: ${lunchboxColors.soymilk};
    }
`

const PageLoader: React.FC<IModalProps> = props => {
    return (
        <LoaderWrapper>
            <Modal {...props}>
                <SpinnerWrapper>
                    <Spinner/>
                </SpinnerWrapper>
            </Modal>
        </LoaderWrapper>  
    )
}

export default PageLoader;