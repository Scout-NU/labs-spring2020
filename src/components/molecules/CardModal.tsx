import React from 'react';
import styled from '../../styles/theme/Theme';
import Card from '../atoms/Card';
import { lunchboxColors } from '../../styles/theme/lunchbox';
import closeSymbol from '../../images/global/closebutton.svg'
import Modal, { IModalProps } from '../atoms/Modal';


const CardModalWrapper = styled(Card)`
    box-shadow: none;
    padding: 4em;
`

const CloseButton = styled.button`
    position: absolute;
    padding: 1.75em 2.75em;
    top: 0;
    right: 0;
    border: none;
    background-color: ${lunchboxColors.jello};
    transition: all .1s ease-in-out;
    border-top-right-radius: inherit;

    & img {
        height: 2em;
    }

    &:hover  {
        background-color: darkred;
    }

    &:active {
        background-color: ${lunchboxColors.jello};
    }
`

const CardModal: React.FC<IModalProps> = props => {
    return (
        <Modal {...props}>
            <CardModalWrapper>
                <CloseButton onClick={props.onModalClosed}><img src={closeSymbol}/></CloseButton>
                {props.children}
            </CardModalWrapper>
        </Modal>
    )
}

export default CardModal;