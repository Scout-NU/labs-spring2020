import styled from "../../theme/Theme";
import React from 'react';
import { lunchboxColors } from '../../theme/lunchbox';

interface ButtonProps {
    style: ButtonStyle;
    onClick: () => void;
}

export enum ButtonStyle {
    PRIMARY,
    SECONDARY
}

const StyledButton = styled.button<ButtonProps>`
    font-family: ${props => props.theme.typography.fontFamily };
    background-color: ${props => props.style == ButtonStyle.PRIMARY ? lunchboxColors.gusher : lunchboxColors.tangerine };
    color: ${props => props.style == ButtonStyle.PRIMARY ? 'black' : 'white' };
    padding: 1em 3.5em;
    text-transform: upcase;
    border-radius: 7px;
    border: none;
    font-size: 16px;
    font-weight: bolder;
`

const Button: React.FC<ButtonProps> = (props) => {
    return (
        <StyledButton style={props.style} onClick={() => props.onClick()}>{props.children}</StyledButton>
    )
}

export default Button;