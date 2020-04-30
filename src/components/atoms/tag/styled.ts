import styled from "../../../styles/theme/Theme";

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