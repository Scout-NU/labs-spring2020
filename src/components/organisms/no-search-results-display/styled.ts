import styled from '../../../styles/theme/Theme';
import devices from '../../../styles/variables/breakpoints';


export const NoResultsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
    padding: 3em;
    width: 100%;
    height: fit-content;
    text-align: left;
`

export const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 4em;

    @media ${devices.tablet} {
        margin: 0;
        width: 100%;
    }
`

export const ImageWrapper = styled.div`
    display: flex;
    flex-direction: column;

    & img {
        height: 12em;
    }

    @media ${devices.tablet} {
        width: 100%;
        margin-bottom: 3em;
    }
`
