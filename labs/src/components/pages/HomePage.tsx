import React from 'react';
import header from '../../images/home-header.svg';
import vic from '../../images/meet-vic.svg';
import styled from '../../theme/Theme';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { lunchboxColors } from '../../theme/lunchbox';
import { P, H1, H2, H3, H4 } from '../atoms/Typography';

interface IHomePageProps {

}

const HeaderSection = styled.section`
    background-color: ${lunchboxColors.icepack};
`

const HeaderImage = styled.img`
    position: relative;
    width: 80%;
`

const MeetVic = styled.img`
    height: 70%;
`

const HeaderCaption = styled.div`
    position: absolute;
    left: 25%;
    top: 20%;
    width: 55%;
    text-align: left;
`

const JourneyBlurb = styled.div`
    width: 50%;
    text-align: left;
    margin-left: 2em;
`

const HomePage: React.FC<IHomePageProps> = props => {
    return (
        <HeaderSection>
            <Col xs>
                <Row end='xs' >
                    <HeaderImage src={header}/>
                    <HeaderCaption>
                        <H3>Let's talk about</H3>
                        <H1>Action Civics in Boston!</H1>
                        <H4>Connect with someone in City Hall and plan your action civics project.</H4>
                    </HeaderCaption>

                    <Col xs={10}>
                        <Row start='xs' middle="xs">
                            <MeetVic src={vic}/>
                            <JourneyBlurb>
                                <H2>Meet Vic!</H2>
                                <H4>Hi, I’m Vic! I’m a high school student in Boston. Scroll to see my journey through my action civics project.</H4>
                            </JourneyBlurb>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </HeaderSection>
    )
}

export default HomePage;