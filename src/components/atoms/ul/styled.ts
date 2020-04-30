import styled from "../../../styles/theme/Theme"
import { lunchboxColors } from "../../../styles/theme/lunchbox"
import { P } from "../typography/Typography"

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