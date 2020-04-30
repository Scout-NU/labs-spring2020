import styled from "../../../styles/theme/Theme";
import { StyledTag } from '../../atoms/tag/styled';


export const StyledTagGroup = styled.div`
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