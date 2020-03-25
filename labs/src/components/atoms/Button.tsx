import styled from "../../theme/Theme";
import React from 'react';
import { lunchboxColors } from '../../theme/lunchbox';

interface ButtonProps {
    buttonStyle: ButtonStyle;
    onClick: () => void;
}

export enum ButtonStyle {
    PRIMARY,
    SECONDARY
}

export const StyledButton = styled.button<ButtonProps>`
    font-family: ${props => props.theme.typography.fontFamily };
    background-color: ${props => props.buttonStyle === ButtonStyle.PRIMARY ? lunchboxColors.gusher : lunchboxColors.tangerine };
    color: white;
    padding: 1em 3.5em;
    text-transform: upcase;
    border-radius: 7px;
    border: none;
    font-size: 16px;
    font-weight: bolder;

    transition: all .1s ease-in-out;

    &:hover {
        transform: scale(1.05);
    }
`

const Button: React.FC<ButtonProps> = (props) => {
    return (
        <StyledButton buttonStyle={props.buttonStyle} onClick={() => props.onClick()}>{props.children}</StyledButton>
    )
}

export default Button;