import React from 'react';
import { createPortal } from 'react-dom';


interface IModalProps {
    isOpen: boolean;
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

    return (
        <>
            {props.isOpen && createPortal(props.children, self)}
        </>
    )
    
}

export default Modal;