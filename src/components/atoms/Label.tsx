import React from 'react';
import styled from "../../theme/Theme";
import { P } from './Typography';


export const Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = props => {
    return (
        <label {...props}>
            <P>{props.children}</P>
        </label>
    )
}