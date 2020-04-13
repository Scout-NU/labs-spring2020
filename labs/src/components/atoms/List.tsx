import styled from "../../theme/Theme";
import { lunchboxColors } from "../../theme/lunchbox";


export const Ul = styled.ul`
    list-style: none;

    & li::before {
        content: "\2022";
        color: ${lunchboxColors.salad};
        display: inline-block;
        margin-left: -1em;
    }
`