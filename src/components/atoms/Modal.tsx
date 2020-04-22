import React from 'react';
import { createPortal } from 'react-dom';
import styled from '../../styles/theme/Theme';
import Card from './Card';
import { lunchboxColors } from '../../styles/theme/lunchbox';
import devices from '../../styles/variables/breakpoints';
import closeSymbol from '../../images/global/closebutton.svg'
import ScrollLock from 'react-scrolllock';
 

interface IModalProps {
    isOpen: boolean;
    onModalClosed: () => void;
}


const Fade = styled.div`
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.7;
    background-color: ${lunchboxColors.gusher};
    transition: all .1s ease-in-out;
`

const ModalWrapper = styled(Card)`
    max-width: 60%;
    max-height: 80%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    overflow: scroll;
    box-shadow: none;
    transition: all .1s ease-in-out;
    display: flex;
    flex-direction: column;
    padding: 4em;
    text-align: left;

    @media ${devices.laptop} {
        padding: 4em 3em;
        max-width: 85%;
        max-height: 94%;
    }
`

const CloseButton = styled.button`
    position: absolute;
    padding: 1.75em 2.75em;
    top: 0;
    right: 0;
    border: none;
    background-color: ${lunchboxColors.jello};
    transition: all .1s ease-in-out;

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

// src: https://dev.to/spukas/react-portals-flexible-modal-implementation-5310
const Modal: React.FC<IModalProps> = props => {
    const root = document.getElementById("modalroot");
    const self = document.createElement("div");

    React.useEffect(() => {
        root?.appendChild(self);

        return () => {
            root?.removeChild(self);
        };
    }, [self]);

    const getModalContent = () => {
        return (
            <>
                <Fade/>
                <ScrollLock>
                    <ModalWrapper>
                        <CloseButton onClick={props.onModalClosed}><img src={closeSymbol}/></CloseButton>
                        {props.children}
                    </ModalWrapper>
                </ScrollLock>
            </>
        )
    }

    return (
        <>
            {props.isOpen && createPortal(getModalContent(), self)}
        </>
    )
    
}

export default Modal;