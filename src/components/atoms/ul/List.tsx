import { P } from "../typography/Typography";
import React from 'react';
import { Ul, Li } from "./styled";


interface ITextListListProps {
    items: string[];
}

const TextList: React.FC<ITextListListProps> = props => {
    return (
        <Ul>
            {props.items.map((item, key) => <Li key={key}><P>{item}</P></Li>)}
        </Ul>
    )
}

export default TextList;