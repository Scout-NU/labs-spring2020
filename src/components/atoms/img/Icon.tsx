import styled from "../../../styles/theme/Theme"

interface IStarIconProps {
    highlighted: boolean;
}

export const StarIcon = styled.div<IStarIconProps>`
    &:before {
        content: ${props => props.highlighted ? "\"★\"" : "\"☆\""};
        color: #FC0;
        font-size: 3em;
        position: relative;
    }
`

interface ICaretIconProps {
    flipped: boolean;
}

export const Caret = styled.i<ICaretIconProps>`
    border: solid white;
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: 3px;
    transform: ${props => props.flipped ? 'rotate(45deg)' : 'rotate(-135deg)'};
`

export const CrossMark = styled.div`
    &:before {
        content: "\\D7";
        font-size: 2em;
        position: relative;
    }
`