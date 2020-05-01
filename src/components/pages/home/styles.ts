import styled from '../../../styles/theme/Theme';
import { lunchboxColors } from '../../../styles/theme/lunchbox';
import { StarIcon } from '../../atoms/img/Icon';
import devices from '../../../styles/variables/breakpoints';
import { NavigationLink } from '../../atoms/typography/Typography';

export const HomePageWrapper = styled.div`
    background-color: ${lunchboxColors.icepack};
`

export const SAPBanner = styled.div`
    position: absolute;
    padding: 1em 1em 1em 11%;
    background-color: white;
    border-radius: 0 2px 2px 0;
    z-index: 1;
    top: 5%;

    @media ${devices.tablet} {
        padding: 1em 1em 1em 4%;
    }
`

export const Divider = styled.div`
    height: 170px;
    width: 2px;
    background-color: black;
    position: absolute;
    left: 50%;
    top: 80%;
    z-index: 1;

    @media ${devices.tablet} {
        top: 70%;
    }

    @media ${devices.laptop} {
        display: none;
    }
`

export const HomePageContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 8em;
`

export const HeaderPeople = styled.img`
    position: absolute;
    width: 30%;
    z-index: 0;
    left: 60%;
    bottom: -7.5%;
    z-index: 1;

    @media ${devices.laptop} {
        bottom: -5.5%;
    }

    @media ${devices.tablet} {
        bottom: -3.5%;
    }
`

export const ConnectionSteps = styled.div`
    display: flex;
    align-content: space-around;
    flex-wrap: wrap;
    margin: 4em 0;
    padding: 0 10%;
`

export const ConnectionStep = styled.div`
    display: flex;
    flex-direction: column;
    width: 33%;
    padding: 0 2em;

    & img {
        height: 50%;
        margin-bottom: 3em;
    }

    @media ${devices.tablet} {
        width: 100%;
        margin-bottom: 4em;

        & img {
            align-self: center;
            width: 50%;
        }
    }
`

export const CATIntroWrapper = styled.div`
    background-color: white;
    width: 100%;
    display: flex;
    flex-wrap: wrap;

    & > div {
        width: 50%;

        @media ${devices.laptop} {
            min-width: 100%;
        }
    }
`

export const CATInformation = styled.div`
    display: flex;
    flex-direction: column;
    padding: 5em 5em 9em 10%;

    & button {
        margin: 1.75em 0;
    }

    & > ${NavigationLink} {
        color: ${lunchboxColors.gusher};
    }

    & button > ${NavigationLink} {
        color: white;
    }

    @media ${devices.laptop} {
        padding: 5em;
    }
`

export const CATCarouselItem = styled.div`
    display: flex;
    min-width: 80%;
    margin: 4em 0 4em 4em;

    & ${StarIcon} {
        display: none;
    }

    @media ${devices.tablet} {
        min-width: 100%;
        margin: 4em 0 10em 4em;
    }
`

export const CATCarousel = styled.div`
    display: flex;
    background-color: ${lunchboxColors.carton};
    padding-right: 4em;
    overflow: scroll;
    overscroll-behavior-x: none;

    & ${CATCarouselItem}:last-child {
        padding-right: 4em;
        min-width: calc(80% + 4em);
    }

    @media ${devices.tablet} {
        & ${CATCarouselItem}:last-child {
            min-width: 100%;
        }
    }
`

export const HomePageHeaderContent = styled.div`
    & button {
        margin-top: 4em;
    }

    & ${NavigationLink} {
        color: white;
    }
`
