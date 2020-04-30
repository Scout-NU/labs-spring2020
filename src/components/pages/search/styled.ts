
import styled from '../../../styles/theme/Theme';
import devices from '../../../styles/variables/breakpoints';

export const HeaderCaption = styled.div`
    position: relative;
    text-align: left;
    margin-top: 4em;

    @media ${devices.tablet} {
        left: auto;
        top: 0vh;
        width: 100%;
    }
`

export const SearchPageContent = styled.div`
    margin-top: -24%;
    z-index: 1;
`