import styled from "../../styles/theme/Theme";
import { lunchboxColors } from "../../styles/theme/lunchbox";


export const Ul = styled.ul`
    list-style: none;

    & li::before {
        content: "\2022";
        color: ${lunchboxColors.salad};
        display: inline-block;
        margin-left: -1em;
    }
`

export const Li = styled.li`
    & * {
        margin: .5em 0;
    }
`