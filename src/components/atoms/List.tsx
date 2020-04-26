import styled from "../../styles/theme/Theme";
import { lunchboxColors } from "../../styles/theme/lunchbox";
import { P } from "./Typography";
import React from 'react';


export const Ul = styled.ul``

export const Li = styled.li`
    color: ${lunchboxColors.salad};
    
    & > ${P} {
        color: black;
    }

    & * {
        margin: .5em 0;
    }
`

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