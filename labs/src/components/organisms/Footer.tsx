import React from 'react';
import footer from '../../images/global/footer.svg';
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
}

const FooterImage = styled.img`
    width: 100%;
    z-index: 0;
`

const FooterContent = styled.div`
    background-color: ${ lunchboxColors.poptart };
    width: 100%;
    height: 5%;
    padding: 0 3em 3em;

`

const FooterLink = styled(NavigationLink)`
    font-weight: bolder;
    margin-left: 1em;
`

const FooterRow = styled(Row)`
    padding: 0 3em;

    @media ${device.tablet} {
        padding-top: 3em;
    }
`

const MonumLogo = styled.img`
    max-height: 5em;
`

const DisconnectedFooter: React.FC<IFooterProps> = props => {
    return (
        <footer>
            <Col xs>
                <Row end='xs'>
                    <FooterImage src={footer}/>
                    <FooterContent>
                        <FooterRow around='xs' bottom='xs' center='xs' end='sm'>
                            <Col xs={6}>
                                <Row start='xs' bottom='xs'>
                                    <MonumLogo src={monumlogo}/>
                                    <FooterLink to={monumRoute}>
                                        Mayor’s Office of New Urban Mechanics
                                    </FooterLink>
                                </Row>
                            </Col>  
                            <Col xs={6}>
                                <Row end='xs'>
                                    {props.footerLinks.map((link, key) => {
                                        return (
                                            <FooterLink to={link.linkURL}>
                                                {link.linkTitle}
                                            </FooterLink>
                                        )
                                    })}
                                </Row>
                            </Col>
                        </FooterRow>
                    </FooterContent>
                </Row>
                
            </Col>
        </footer>
    )
}

export const Footer: React.FC = props => {
    const links: ILink[] = [
        { linkTitle: 'FAQ', linkURL: '' },
        { linkTitle: 'Conversation Guide', linkURL: '' },
        { linkTitle: 'Email Us', linkURL: ''},
     ]

    return (
        <DisconnectedFooter footerLinks={links}/>
    )
}

export default Footer;