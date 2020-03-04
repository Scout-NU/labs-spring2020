import styled from "../../theme/Theme";
import devices from '../../styles/breakpoints';
import { lunchboxColors } from "../../theme/lunchbox";
import headerblob from '../../images/global/headerblob.svg';
import React from 'react';

interface HeaderBlobProps {
    // color: string;
}

const StyledHeaderBlob = styled.img<HeaderBlobProps>`
    position: absolute;
    right: 0;
    top: 0;
    width: 80%;
    z-index: -1;

    @media ${devices.laptop} {
        width: 100%;
        
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
