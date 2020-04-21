import React from 'react';
import styled from "../../styles/theme/Theme";
import { P } from "./Typography";


interface ITagProps {
    text: string;
    onClick?: () => void;
}

export const StyledTag = styled.div`
    border: .5px solid black;
    padding: 3px 10px;
    border-radius: 999px;
    height: min-content;
    white-space: nowrap;
    width: fit-content;
    & > p {
        margin: 0;
    }
`

const Tag: React.FC<ITagProps> = props => {
    return (
        <StyledTag><P>{props.text}</P></StyledTag>
    )
}


export default Tag;