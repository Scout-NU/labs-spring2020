import React from 'react';
import footerPeople from '../../images/global/footer-people.svg';
import monumlogo from '../../images/global/monumlogo.svg';
import styled from '../../theme/Theme';
import { NavigationLink, A } from '../atoms/Typography';
import { lunchboxColors } from '../../theme/lunchbox';
import device from '../../styles/breakpoints';
import { monumRoute } from '../../var/routes';
import { ILink } from '../../types/client/client';

interface IFooterProps {
    footerLinks: ILink[];
    departmentLink: ILink;
}

const FooterImage = styled.img`
    position: relative;
    width: 10em;
    z-index: 0;
    left: 10%;
    top: 40px;
`

const FooterLink = styled(NavigationLink)`
    margin-left: 1em;
`

const MonumLogo = styled.img`
    max-height: 5em;
`

const StyledFooter = styled.footer`
    width: 100%;
    margin-top: 4em;
`

const FooterGroup = styled.div`
    display: flex;
    flex-direction: row;
    width: 50%;
    align-items: flex-end;

    @media ${device.tablet} {
        width: 100%;
    }
`

const LinkGroup = styled(FooterGroup)`
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

const FooterContent = styled.div`
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

const DisconnectedFooter: React.FC<IFooterProps> = props => {
    return (
        <StyledFooter>
            <FooterImage src={footerPeople}/>
            <FooterContent>
                <LinkGroup>
                    {props.footerLinks.map((link, key) => {
                        return (
                            <FooterLink key={key} to={link.linkURL}>
                                {link.linkTitle}
                            </FooterLink>
                        )
                    })}
                </LinkGroup>
                <FooterGroup>
                    <MonumLogo src={monumlogo}/>
                    <A href={props.departmentLink.linkURL} target='_blank'>
                        {props.departmentLink.linkTitle}
                    </A>
                </FooterGroup>  
            </FooterContent>
        </StyledFooter>
    )
}

export const Footer: React.FC = props => {
    const links: ILink[] = [
        { linkTitle: 'FAQ', linkURL: '' },
        { linkTitle: 'Conversation Guide', linkURL: '' },
        { linkTitle: 'Email Us', linkURL: ''},
     ]

     const deplink = {
         linkTitle: `MAYOR'S OFFICE OF NEW URBAN MECHANICS`,
         linkURL: monumRoute
     }

    return (
        <DisconnectedFooter footerLinks={links} departmentLink={deplink}/>
    )
}

export default Footer;