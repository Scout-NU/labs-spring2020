import styled from '../../../styles/theme/Theme';
import { NavigationLink } from '../../atoms/typography/Typography';
import { lunchboxColors } from '../../../styles/theme/lunchbox';
import device from '../../../styles/variables/breakpoints';

// REFACTOR: This needs to be absolute, not relative so that it does not interrupt document flow and lets things touch the footer. 
export const FooterImage = styled.img`
    position: relative;
    width: 10em;
    z-index: 0;
    left: 10%;
    top: 40px;
`

export const FooterLink = styled(NavigationLink)`
    margin-left: 1em;
`

export const MonumLogo = styled.img`
    max-height: 5em;
`

// REFACTOR: get rid of the margin here.
export const StyledFooter = styled.footer`
    width: 100%;
    margin-top: 4em;
`

export const FooterGroup = styled.div`
    display: flex;
    flex-direction: row;
    width: 50%;
    align-items: flex-end;

    @media ${device.tablet} {
        width: 100%;
    }
`

export const LinkGroup = styled(FooterGroup)`
    align-items: flex-end;
    justify-content: flex-end;

    @media ${device.tablet} {
        flex-direction: column;
        align-items: flex-start;
        width: 100%;

        & ${NavigationLink} {
            margin-bottom: 2em;
        }
    }
`

export const FooterContent = styled.div`
    display: flex;
    flex-direction: row-reverse;
    background-color: ${ lunchboxColors.poptart };
    height: 5%;
    padding: 3em 5em 3em 8em;
    border-radius: 175px 0 0 0;
    justify-content: space-around;

    @media ${device.tablet} {
        border-radius: 0;
        flex-direction: row;
        flex-wrap: wrap;
        padding: 3em 2em 3em;
    }
`