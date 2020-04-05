
import React from 'react';
import styled from "../../theme/Theme";
import Tag, {StyledTag} from '../atoms/Tag';

interface TagGroupProps {
    tags: string[];
}

const StyledTagGroup = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;

    & ${StyledTag} {
        margin-bottom: .7em;
    }

    & ${StyledTag}:not(:last-child) {
        margin-right: .5em;
    }
`

const TagGroup: React.FC<TagGroupProps> = props => {
    return(
        <StyledTagGroup>
            {props.tags.map((value, i) => <Tag text={value} key={i}/>)}
        </StyledTagGroup>        
    )
}

export default TagGroup;