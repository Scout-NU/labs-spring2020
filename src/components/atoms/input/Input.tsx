import React, { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { useField } from '@unform/core';
import { StyledTextInput, StyledCheckbox, StyledTextArea } from './styled';


interface IInputProps  {
    name: string;
}

const Input: React.FC<IInputProps & InputHTMLAttributes<HTMLInputElement>> = (props) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const {fieldName, registerField } = useField(props.name);
    const input = <StyledTextInput ref={inputRef} {...props}/>;
    React.useEffect(() => {
        registerField({
            name: fieldName, 
            ref: inputRef.current,
            path: 'value',
        });
    }, [fieldName, registerField]);
    
    switch(props.type) {
        case 'checkbox':
            return <StyledCheckbox> {input} </StyledCheckbox>;
        default:
            return input;
    }
}

export const TextArea: React.FC<IInputProps & TextareaHTMLAttributes<HTMLTextAreaElement>> = (props) => {
    const inputRef = React.useRef<HTMLTextAreaElement>(null);
    const {fieldName, registerField } = useField(props.name);
    React.useEffect(() => {
        registerField({
            name: fieldName, 
            ref: inputRef.current,
            path: 'value',
        });
    }, [fieldName, registerField]);
    
    return <StyledTextArea ref={inputRef} {...props}/>;
}



export default Input;