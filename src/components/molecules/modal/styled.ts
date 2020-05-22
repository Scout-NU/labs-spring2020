import styled from "styled-components"
import { lunchboxColors } from "../../../styles/theme/lunchbox"
import devices from "../../../styles/variables/breakpoints"
import Card from "../../atoms/card/Card"

export const ModalBackgroundFade = styled.div`
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.7;
    background-color: ${lunchboxColors.gusher};
    z-index: 998;
`

export const ModalWrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    max-height: 80%;
    max-width: 60%;
    overflow: auto;
    box-shadow: none;
    text-align: left;
    z-index: 999;
    transition: all .1s ease-in-out;

    @media ${devices.laptop} {
        padding: 4em 3em;
        max-width: 85%;
        max-height: 94%;
    }
`

export const CardModalWrapper = styled(Card)`
    box-shadow: none;
    padding: 4em;
`

export const CloseButton = styled.button`
    position: absolute;
    padding: 1.75em 2.75em;
    top: 0;
    right: 0;
    border: none;
    background-color: ${lunchboxColors.jello};
    transition: all .1s ease-in-out;
    border-top-right-radius: inherit;

    & img {
        height: 2em;
    }

    &:hover  {
        background-color: darkred;
    }

    &:active {
        background-color: ${lunchboxColors.jello};
    }
`
