import React from 'react';
import Spinner from '../../atoms/spinner/Spinner';
import Modal, {IModalProps} from '../modal/Modal';
import { LoaderWrapper, SpinnerWrapper } from './styled';



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