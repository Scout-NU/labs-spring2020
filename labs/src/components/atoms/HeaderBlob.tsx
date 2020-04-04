import styled from "../../theme/Theme";
import devices from '../../styles/breakpoints';
import { lunchboxColors } from "../../theme/lunchbox";
import headerblob from '../../images/global/headerblob.svg';
import React from 'react';

interface HeaderBlobProps {
    // color: string;
}

const HeaderBlobContainer = styled.div`
    position: absolute;
    right: 0;
    top: 0;
    z-index: -1;

    width: 80%;
    
    @media ${devices.laptop} {
        width: 100%;
    }
`

const HeaderBlobBuffer = styled.div`
    height: 25vh;
    width: 100%;
    background-color: ${lunchboxColors.poptart};
    display: none;

    @media ${devices.laptop} {
        display: block;
    }
`

const StyledHeaderBlob = styled.img<HeaderBlobProps>`
    position: relative;
    bottom: 10px;
    width: 100%;
`

interface InameProps {

}

export const HeaderBlob: React.FC<InameProps> = props => {
    return (
        <HeaderBlobContainer>
            <HeaderBlobBuffer></HeaderBlobBuffer>
            <StyledHeaderBlob src={headerblob}/>
        </HeaderBlobContainer>
    )
}
export default HeaderBlob;
