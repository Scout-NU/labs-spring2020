import styled from "../../theme/Theme";
import devices from '../../styles/breakpoints';
import { lunchboxColors } from "../../theme/lunchbox";
import headerblob from '../../images/global/headerblob.svg';
import React from 'react';

interface HeaderBlobProps {
    // color: string;
}

const StyledHeaderBlob = styled.img<HeaderBlobProps>`
    position: relative;
    width: 80%;

    @media ${devices.laptop} {
        top: -5px;
        width: 100%;
        min-height: 70vh;
    }
`

interface InameProps {

}

export const HeaderBlob: React.FC<InameProps> = props => {
    return (
        <StyledHeaderBlob src={headerblob}/>
    )
}
export default HeaderBlob;
