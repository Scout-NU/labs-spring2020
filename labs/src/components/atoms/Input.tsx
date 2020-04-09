import React, { InputHTMLAttributes } from 'react';
import { useField } from '@unform/core';
import styled from '../../theme/Theme';
import { lunchboxColors } from '../../theme/lunchbox';

const StyledInput = styled.input``;

const StyledCheckbox = styled.div`
    display: inline-flex;
    cursor: pointer;
    position: relative;

    & input {
        height: 24px;
        width: 24px;
        appearance: none;
        border: 2px solid ${lunchboxColors.gusher};
        border-radius: 3px;
        outline: none;
        transition: all .3s;
        background-color: white;
        cursor: pointer;
    }

    & input:checked {
        border: none;
        background-color: ${lunchboxColors.gusher};
    }


`

interface IInputProps  {
    name: string;
}

const Input: React.FC<IInputProps & InputHTMLAttributes<HTMLInputElement>> = (props) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const {fieldName, registerField } = useField(props.name);
    const input = <StyledInput ref={inputRef} {...props}/>;
    React.useEffect(() => {
        registerField({
            name: fieldName, 
            ref: inputRef.current,
            path: 'value',
        });
    }, [fieldName, registerField]);

    if (props.type === 'checkbox') return <StyledCheckbox> {input} </StyledCheckbox>
    return input;
}

export default Input;