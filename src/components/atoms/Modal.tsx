import React, { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import ScrollLock from 'react-scrolllock';
import styled from '../../styles/theme/Theme';
import { lunchboxColors } from '../../styles/theme/lunchbox';
import devices from '../../styles/variables/breakpoints';
 

export interface IModalProps {
    isOpen: boolean;
    onModalClosed?: () => void;
}

export const ModalBackgroundFade = styled.div`
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.7;
    background-color: ${lunchboxColors.gusher};
    transition: all .1s ease-in-out;
    z-index: 998;
`

export const ModalWrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    max-height: 80%;
    max-width: 60%;
    overflow: scroll;
    box-shadow: none;
    text-align: left;
    z-index: 999;
    transition: all .1s ease-in-out;

    @media ${devices.laptop} {
        padding: 4em 3em;
        max-width: 85%;
        max-height: 94%;
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
    
    const getModalContent = (): ReactNode => {
        // Need a fragment in here to keep the Scrollock happy...
        return(
            <>
                <ModalBackgroundFade/>
                <ScrollLock>
                    <ModalWrapper>
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