import { lunchboxColors } from '../../../styles/theme/lunchbox';
import styled from '../../../styles/theme/Theme';
import devices from '../../../styles/variables/breakpoints';
import { P } from '../../atoms/typography/Typography';

export const Blob = styled.div`
    width: fit-content;
    height: fit-content;
    border-radius: 70% 30% 30% 70% / 60% 40% 60% 40%;
    background-color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 9em;
    @media ${devices.laptop} {
        padding: 8em;
    }
`

export const Content = styled.div`
    padding: 3em;

    & ${P} {
        margin-bottom: 3em;
    }

    @media ${devices.laptop} {
        padding: 0 0 5em 0;
    }
`

export const PageWrapper = styled.div`
    min-height: 100vh;
    background-color: ${lunchboxColors.carton};
`

export const Decoration = styled.img`
    width: 20em;
    position: absolute;
    right: 0;
    bottom: 0;

    @media ${devices.laptop} {
        padding: 5em 0 0 0;
        right: 10%;
        width: 16em;
    }
`