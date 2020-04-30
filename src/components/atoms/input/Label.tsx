import React from 'react';
import { StyledLabel } from './styled';


export const Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = props => {
    return (
        <label {...props}>
            <StyledLabel>{props.children}</StyledLabel>
        </label>
    )
}