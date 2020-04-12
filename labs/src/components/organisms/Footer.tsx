import React from 'react';
import footer from '../../images/global/footer-people.svg';
import monumlogo from '../../images/global/monumlogo.svg';
import styled from '../../theme/Theme';
import { Col, Row } from 'react-flexbox-grid';
import { H4, NavigationLink } from '../atoms/Typography';
import { lunchboxColors } from '../../theme/lunchbox';
import Button, { ButtonStyle } from '../atoms/Button';
import device from '../../styles/breakpoints';
import { searchPageRoute, monumRoute, homePageRoute } from '../../var/routes';
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
    font-weight: bolder;
    margin-left: 1em;
`

const MonumLogo = styled.img`
    max-height: 5em;
`

const StyledFooter = styled.footer`
    width: 100%;
`

const FooterGroup = styled.div`
    display: flex;
    align-items: flex-end;
    flex-basis: 100%;

    @media ${device.tablet} {
        flex-direction: row;
        flex-basis: 50%;
    }
`

const FooterContent = styled.div`
    flex: 0 1 auto;
    flex-wrap: wrap;
    flex-direction: row-reverse;
    background-color: ${ lunchboxColors.poptart };
    /* width: 100%; */
    height: 5%;
    padding: 2em 5em 3em;
    border-radius: 175px 0 0 0;
    justify-content: space-around;

    @media ${device.tablet} {
        border-radius: 0;
        flex-direction: row;
        padding: 0 3em;
    }
`

const DisconnectedFooter: React.FC<IFooterProps> = props => {
    return (
        <StyledFooter>
            <FooterImage src={footer}/>
            <FooterContent>
                <FooterGroup>
                    {props.footerLinks.map((link, key) => {
                        return (
                            <FooterLink to={link.linkURL}>
                                {link.linkTitle}
                            </FooterLink>
                        )
                    })}
                </FooterGroup>
                <FooterGroup>
                    <MonumLogo src={monumlogo}/>
                    <FooterLink to={props.departmentLink.linkURL}>
                        {props.departmentLink.linkTitle}
                    </FooterLink>
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