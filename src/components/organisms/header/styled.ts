import styled from '../../../styles/theme/Theme';
import { NavigationLink } from '../../atoms/typography/Typography';
import devices from '../../../styles/variables/breakpoints';
import { lunchboxColors } from '../../../styles/theme/lunchbox';

export const HeaderContainer = styled.nav`
    position: absolute;
    top: 0;
    z-index: 3;
    width: 100%;
`

export const HeaderLink = styled(NavigationLink)`
    text-transform: uppercase;
    margin: 2em 3em 2em 1em;


    @media ${devices.tablet} {
        margin: 2em 0;
    }
`
// TODO: there's a bug where if you go to a link from mobile and then re-expand to desktop is doens't reappear
// TODO: ImageButton
export const Burger = styled.img`
display: none;
    position: absolute;
    right: 2em;
    top: 2em;
    height: 2em;
    transition: all .1s ease-in-out;

    &:hover {
        transform: scale(1.2);
    }

    @media ${devices.tablet} {
        display: flex;
    }
`

export const HeaderMenu = styled.div`

    @media ${devices.desktop} {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
    }

    @media ${devices.tablet} {
        position: absolute;
        text-align: left;
        width: auto;
        top: 2em;
        right: 2em;
        display: none;
        flex-direction: column;
        padding: 1em 2em;
        background-color: ${lunchboxColors.gusher};
        color: white;
        z-index: 3;
        box-shadow: 0 0 10px ${lunchboxColors.gusher};
    }
`

export const CloseButton = styled.img`
    display: none;
    position: absolute;
    right: 1.5em;
    top: 1.5em;
    height: 8%;
    transition: all .2s ease-in-out;

    &:hover {
        transform: scale(1.1);
    }

    @media ${devices.tablet} {
        display: flex;
    }
`
