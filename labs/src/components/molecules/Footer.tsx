import React from 'react';
import footer from '../../images/global/footer.svg';
import monumlogo from '../../images/global/monumlogo.svg';
import styled from '../../theme/Theme';
import { Col, Row } from 'react-flexbox-grid';
import { H1 } from '../atoms/Typography';
import { lunchboxColors } from '../../theme/lunchbox';
import Button, { ButtonStyle } from '../atoms/Button';

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

const FooterContentHeader = styled.p`
    font-family: ${props => props.theme.typography.fontFamily};
    font-weight: bolder;
    font-size: 26px;
    color: white;
`

const FooterLink = styled.p`
    font-family: ${props => props.theme.typography.fontFamily};
    font-weight: lighter;
    color: white;
    font-size: 20px;
`

const FooterColumn = styled.div`
    text-align: left;
    padding-bottom: 6em;
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
                        <Row end='xs'>
                            <Col xs={4}>
                                <FooterColumn>
                                    <FooterContentHeader>How do I connect with City Hall?</FooterContentHeader>
                                    <FooterLink>
                                        Connect with City Hall
                                    </FooterLink>
                                </FooterColumn>
                            </Col>
                            <Col xs={4}>
                                <FooterColumn>
                                    <FooterContentHeader>How do I write my email?</FooterContentHeader>
                                    <FooterLink>
                                        Email resources
                                    </FooterLink>
                                    <Button style={ButtonStyle.SECONDARY} onClick={() => console.log("help!") }>Help</Button>
                                </FooterColumn>
                            </Col>
                        </Row>
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