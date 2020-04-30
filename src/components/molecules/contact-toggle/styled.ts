import styled from "../../../styles/theme/Theme";
import { StarIcon } from "../../atoms/img/Icon";

export const ToggleButton = styled(StarIcon)`
    transition: all .1s ease-in-out;
    &:hover {
        transform: scale(1.1);
    }
`
