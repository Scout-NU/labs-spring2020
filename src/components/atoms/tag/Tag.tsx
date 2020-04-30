import React from 'react';
import { P } from "../typography/Typography";
import { StyledTag } from './styled';


interface ITagProps {
    text: string;
    onClick?: () => void;
}


const Tag: React.FC<ITagProps> = props => {
    return (
        <StyledTag><P>{props.text}</P></StyledTag>
    )
}


export default Tag;