import styled from "../../theme/Theme";
import devices from '../../styles/breakpoints';

interface HeaderBlobProps {
    color: string;
}

const HeaderBlob = styled.div<HeaderBlobProps>`
    z-index: -1;
    background-color: ${props => props.color};
    transform: skew(10deg, 5deg);
    width: 80%;

    @media ${devices.laptop} {
        top: -5px;
        width: 100%;
        min-height: 70vh;
    }
`
export default HeaderBlob;
