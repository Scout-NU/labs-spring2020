
import React from 'react';
import Tag from '../../atoms/tag/Tag';
import { StyledTagGroup } from './styled';

interface TagGroupProps {
    tags: string[];
}

const TagGroup: React.FC<TagGroupProps> = props => {
    return(
        <StyledTagGroup>
            {props.tags.map((value, i) => <Tag text={value} key={i}/>)}
        </StyledTagGroup>        
    )
}

export default TagGroup;