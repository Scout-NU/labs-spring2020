import React, { InputHTMLAttributes } from 'react';
import { useField } from '@unform/core';
import styled from '../../theme/Theme';

const StyledInput = styled.input``;

interface IInputProps  {
    name: string;
}

const Input: React.FC<IInputProps & InputHTMLAttributes<HTMLInputElement>> = (props) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const {fieldName, defaultValue = '', registerField, error} = useField(props.name);

    React.useEffect(() => {
        registerField({
            name: fieldName, 
            ref: inputRef.current,
            path: 'value',
        });
    }, [fieldName, registerField]);

    return <StyledInput ref={inputRef} defaultValue={defaultValue} {...props}/>;
}

export default Input;