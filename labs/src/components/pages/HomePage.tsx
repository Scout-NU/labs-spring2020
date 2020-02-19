import React from 'react';
import header from '../../images/home/home-header.svg';
import vic from '../../images/home/vic-0.svg';
import styled from '../../theme/Theme';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { lunchboxColors } from '../../theme/lunchbox';
import JourneyStep, {StepContainer} from '../molecules/JourneyBlurb';
import { P, H1, H2, H3, H4, NavigationLink, scaleFont } from '../atoms/Typography';
import devices from '../../styles/breakpoints';


interface IHomePageProps {

}

const HeaderSection = styled.section`
    background-color: ${lunchboxColors.icepack};
`

const HeaderImage = styled.img`
    position: relative;
    width: 80%;

    @media ${devices.laptop} {
        top: -5px;
        width: 100%;
        min-height: 70vh;
    }
`

const JourneyImage = styled.img`
    height: 40vw;
`

const HeaderCaption = styled.div`
    position: absolute;
    left: 25%;
    top: 25%;
    width: 55%;
    text-align: left;


    @media ${devices.tablet} {
        left: auto;
        top: 5vh;
        width: 70%;
    }
`

const JourneyBlurb = styled.div`
    width: 50%;
    text-align: left;
    margin-left: 2em;

    @media ${devices.tablet} {
        width: 60%;
    }
`

const LetsGoButton = styled.button`
    background-color: ${lunchboxColors.gusher};
    font-size: ${ props => scaleFont(props.theme.typography.h4) };
    border-radius: 500px;
    color: white;
    padding: 1em 2em;
    font-family: ${ props => props.theme.typography.fontFamily };
    font-weight: bolder;
    margin: 2em 0;
`

// TODO: Break this out into its own compoonent
const JourneySteps = styled.div`

    & ${StepContainer}:nth-child(even) {
        flex-direction: row-reverse;
    };

    @media ${devices.tablet} {
        ${StepContainer} {
            flex-direction: row;
        };
    }

`

const HomePage: React.FC<IHomePageProps> = props => {
    const blurbs = [
        {
            title: "At first, Vic felt stuck",
            text: "For this project, I wanted to find a topic I actually cared about. The streets in my neighborhood are old, but I didn’t see how that connected to civics. Then, my teacher told us about this website...",
            imageName: "vic-1",
            textFirst: true
        },
        {
            title: "The filters really helped",
            text: "I searched for “street” and started to find some people in City Hall to connect with. A few options came up, including Jane Doe at the Public Works Department.",
            imageName: "vic-2",
            textFirst: false
        },
        {
            title: "Emailing Kate at City Hall",
            text: "I saw on Kate Jay’s profile that she works on making walking safer. I also felt like we both cared about the same things, so I really wanted to email her. I was still nervous about emailing Kate, but the email form helped a lot.",
            imageName: "vic-3",
            textFirst: true
        },
        {
            title: "Kate’s profile gave Vic a great idea",
            text: "I looked at the “Here’s what we do” section on her profile and noticed how Kate and her team are trying to make walking around Boston easier and safer. It made me think about the crosswalk near my school. It’s old, which makes crossing dangerous. I’d seen lots of other new crosswalks around the city, and wondered why mine wasn’t fixed yet.",
            imageName: "vic-4",
            textFirst: false
        },
        {
            title: "Emailing Kate",
            text: "In my email, I introduced myself and my group’s project. I also told her about the crosswalk near my school and asked,  “Why do some crosswalks get fixed before others?” Within a week, Kate emailed me back! She shared a lot of interesting information, like how the Public Works Department uses a specific system to decide which sidewalks need to be fixed before others.",
            imageName: "vic-5",
            textFirst: true
        },
        {
            title: "Vic found a focus",
            text: "Talking with Kate from City Hall helped me connect my project idea to what’s happening in City Hall. Now, my group and I have a clear path to what our project will focus on: improving the sidewalks near my school!",
            imageName: "vic-6",
            textFirst: false
        }
    ]

    return (
        <>
        <HeaderSection>
            <Col xs>
                <Row center='xs' end='md'>         
                    <HeaderImage src={header}/>
                    <HeaderCaption>
                        <H3>Let's talk about</H3>
                        <H1>Action Civics in Boston!</H1>
                        <H4>Connect with someone in City Hall and plan your action civics project.</H4>
                    </HeaderCaption>
           
                    <Col xs={10}>
                        <Row start='xs' middle='xs'>
                            <JourneyImage src={vic}/>
                            <JourneyBlurb>
                                <H2>Meet Vic!</H2>
                                <H4>Hi, I’m Vic! I’m a high school student in Boston. Scroll to see my journey through my action civics project.</H4>
                            </JourneyBlurb>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </HeaderSection>

        <section>
            <Col xs>
                <Row center='xs'>
                    <Col xs={10}>
                        <JourneySteps>
                            { blurbs.map((item, i) => <JourneyStep key={i} title={item.title} text={item.text} textFirst={item.textFirst} imageName={item.imageName} />)}
                        </JourneySteps>
                    </Col>
                </Row>
            </Col>
        </section>
        <Row middle='xs' center='xs'>
            <LetsGoButton>Let's go!</LetsGoButton>
        </Row>
        </>
    )
}

export default HomePage;