import React from 'react';
import { P } from './Typography';


export const Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = props => {
    return (
        <label {...props}>
            <P>{props.children}</P>
        </label>
    )
}