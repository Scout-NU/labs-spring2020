import React from 'react';
import closeSymbol from '../../../images/global/closebutton.svg'
import Modal, { IModalProps } from './Modal';
import { CardModalWrapper, CloseButton } from './styled';


const CardModal: React.FC<IModalProps> = props => {
    return (
        <Modal {...props}>
            <CardModalWrapper>
                <CloseButton onClick={props.onModalClosed}><img src={closeSymbol} alt={'Close button for this window.'}/></CloseButton>
                {props.children}
            </CardModalWrapper>
        </Modal>
    )
}

export default CardModal;