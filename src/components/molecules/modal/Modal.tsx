import React, { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import ScrollLock from 'react-scrolllock';
import { ModalBackgroundFade, ModalWrapper } from './styled';
 

export interface IModalProps {
    isOpen: boolean;
    onModalClosed?: () => void;
}

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