import React from 'react';
import footer from '../../images/global/footer.svg';
import monumlogo from '../../images/global/monumlogo.svg';
import styled from '../../theme/Theme';
import { Col, Row } from 'react-flexbox-grid';
import { H4, NavigationLink } from '../atoms/Typography';
import { lunchboxColors } from '../../theme/lunchbox';
import Button, { ButtonStyle } from '../atoms/Button';
import device from '../../styles/breakpoints';

interface IFooterProps {

}

const FooterImage = styled.img`
    width: 100%;
    z-index: 0;
`

const FooterContent = styled.div`
    background-color: ${ lunchboxColors.gusher };
    width: 100%;
`

const FooterContentHeader = styled(H4)`
    font-weight: bolder;
    color: white;
    margin-bottom: 1em;
`

const FooterLink = styled(NavigationLink)`
    color: white;
    font-weight: lighter;
    margin-bottom: 1em;
`

const FooterColumn = styled.div`
    text-align: left;
    padding-bottom: 4em;
`

const FooterRow = styled(Row)`
    padding: 0 3em;

    @media ${device.tablet} {
        padding-top: 3em;
    }
`

const MonumLogo = styled.img`
    margin-bottom: 4em;
`

const Footer: React.FC<IFooterProps> = props => {
    return (
        <footer>
            <Col xs>
                <Row end='xs'>
                    <FooterImage src={footer}/>
                    <FooterContent>
                        <FooterRow around='xs' center='xs' end='sm'>
                            <Col xs={6} sm={4}>
                                <FooterColumn>
                                    <FooterContentHeader>How do I connect with City Hall?</FooterContentHeader>
                                    <FooterLink>
                                        Connect with City Hall
                                    </FooterLink>
                                </FooterColumn>
                            </Col>
                            <Col xs={6} sm={4}>
                                <FooterColumn>
                                    <FooterContentHeader>How do I write my email?</FooterContentHeader>
                                    <FooterLink>
                                        Email resources
                                    </FooterLink>
                                    <Button buttonStyle={ButtonStyle.SECONDARY} onClick={() => console.log("help!") }>Help</Button>
                                </FooterColumn>
                            </Col>
                        </FooterRow>
                        <Col xs={10} xsOffset={1}>
                            <Row start='xs' middle='xs'>
                                <MonumLogo src={monumlogo}/>
                                <FooterLink>
                                    Mayor’s Office of New Urban Mechanics
                                </FooterLink>
                            </Row>
                        </Col>
                    </FooterContent>
                </Row>
                
            </Col>
        </footer>
    )
}

export default Footer;