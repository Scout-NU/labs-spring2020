import styled from "../../styles/theme/Theme";
import React from 'react';
import { lunchboxColors } from '../../styles/theme/lunchbox';
import { A } from "./Typography";

interface ButtonProps {
    buttonStyle: ButtonStyle;
    onClick?: () => void;
}


export enum ButtonStyle {
    PRIMARY,
    SECONDARY,
    TERTIARY,
    CLEAR
}

const mapStyleToBackgroundColor = (style: ButtonStyle): string => {
    switch(style) {
        case ButtonStyle.PRIMARY:
            return lunchboxColors.gusher;
        case ButtonStyle.SECONDARY:
            return lunchboxColors.gusher;
        case ButtonStyle.TERTIARY:
            return lunchboxColors.salad;
        case ButtonStyle.CLEAR:
            return '#00000000';
    }
}

const mapStyleToTextColor = (style: ButtonStyle): string => {
    switch(style) {
        case ButtonStyle.PRIMARY:
        case ButtonStyle.SECONDARY:
        case ButtonStyle.TERTIARY:
            return 'white';
        case ButtonStyle.CLEAR:
            return 'black';
    }
}

export const StyledButton = styled.button<ButtonProps>`
    font-family: ${props => props.theme.typography.fontFamily };
    background-color: ${props => mapStyleToBackgroundColor(props.buttonStyle)};
    color: ${props => mapStyleToTextColor(props.buttonStyle)};
    padding: 1em 3.5em;
    text-transform: upcase;
    border-radius: 7px;
    border: none;
    font-size: 16px;
    font-weight: bolder;
    width: fit-content;

    transition: all .1s ease-in-out;

    & ${A} {
        color: white;
    }

    &:hover {
        transform: scale(1.05);
    }
`

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps> = (props) => {
    return (
        <StyledButton {...props} buttonStyle={props.buttonStyle} onClick={() => { if (props.onClick) props.onClick() } }>{props.children}</StyledButton>
    )
}

export default Button;