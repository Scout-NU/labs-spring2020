import React from 'react';
import { StyledButton, ButtonStyle } from "./styled";

export interface ButtonProps {
    buttonStyle: ButtonStyle;
    onClick?: () => void;
}

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps> = (props) => {
    return (
        <StyledButton {...props} buttonStyle={props.buttonStyle} onClick={() => { if (props.onClick) props.onClick() } }>{props.children}</StyledButton>
    )
}

export default Button;