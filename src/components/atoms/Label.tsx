import React from 'react';
import { P } from './Typography';
import styled from '../../styles/theme/Theme';

const StyledLabel = styled(P)`
    font-weight: bolder;
` 

export const Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = props => {
    return (
        <label {...props}>
            <StyledLabel>{props.children}</StyledLabel>
        </label>
    )
}