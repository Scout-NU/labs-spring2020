import React, { InputHTMLAttributes } from 'react';
import { useField } from '@unform/core';
import styled from '../../styles/theme/Theme';
import { lunchboxColors } from '../../styles/theme/lunchbox';
import { InputFontProperties } from './Typography';


export const StyledTextInput = styled.input`
    border: 3px solid blue;
    width: 100%;
    min-height: 3em;
    padding: 1em;
    font-family: 'montserrat';
    ${InputFontProperties};
`

export const StyledCheckbox = styled.div`
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

export default Input;