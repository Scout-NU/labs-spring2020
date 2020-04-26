import React from 'react';
import styled from '../../styles/theme/Theme';
import { lunchboxColors } from '../../styles/theme/lunchbox';
import { H1, H5, NavigationLink, H3, P } from '../atoms/Typography';
import devices from '../../styles/variables/breakpoints';
import Button, { ButtonStyle } from '../atoms/Button';
import PersonPreview from '../molecules/PersonPreview';
import { PageHeader, PageTitleGroup, PageSubheader, HeaderVariant } from '../templates/Page';
import { IHomeContent } from '../../types/client/page/home';
import { IPerson } from '../../types/client/model/person';
import { Li, Ul } from '../atoms/List';

interface IDisconnectedHomePageProps {
    content: IHomeContent;
    carouselItems: IPerson[];
}

const HomePageWrapper = styled.div`
    background-color: ${lunchboxColors.icepack};
`

const SAPBanner = styled.div`
    position: absolute;
    padding: 1em 1em 1em 11%;
    background-color: white;
    border-radius: 0 2px 2px 0;
    z-index: 1;
    top: 5%;
`

const Divider = styled.div`
    height: 170px;
    width: 2px;
    background-color: black;
    position: absolute;
    left: 50%;
    top: 80%;
    z-index: 1;

    @media ${devices.laptop} {
        display: none;
    }
`

const HomePageContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 8em;
`

const HeaderPeople = styled.img`
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

const ConnectionSteps = styled.div`
    display: flex;
    align-content: space-around;
    flex-wrap: wrap;
    margin: 4em 0;
    padding: 0 10%;
`

const ConnectionStep = styled.div`
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

const CATIntroWrapper = styled.div`
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

const CATInformation = styled.div`
    display: flex;
    flex-direction: column;
    padding: 5em 5em 0 10%;

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

const CATCarouselItem = styled.div`
    display: flex;
    min-width: 80%;
    margin: 4em 0 4em 4em;
`

const CATCarousel = styled.div`
    display: flex;
    background-color: ${lunchboxColors.carton};
    padding-right: 4em;
    overflow: scroll;
    overscroll-behavior-x: none;

    & ${CATCarouselItem}:last-child {
        padding-right: 4em;
        min-width: calc(80% + 4em);
    }
`

const HomePageHeaderContent = styled.div`
    & button {
        margin-top: 4em;
    }

    & ${NavigationLink} {
        color: white;
    }
`

const DisconnectedHomePage: React.FC<IDisconnectedHomePageProps> = props => {
    const {content, carouselItems} = props;
const exploreProfilesButton = <Button buttonStyle={ButtonStyle.PRIMARY}><NavigationLink to={content.exploreLink.linkURL}>{content.exploreLink.linkTitle}</NavigationLink></Button>

    return (
        <HomePageWrapper>
            <SAPBanner>
                <H5>{content.siteBannerText}</H5>
            </SAPBanner>
            <Divider/>
            <PageHeader headerVariant={HeaderVariant.HOME}>
                <HeaderPeople src={content.headerDecorationUrl}/>
                <HomePageHeaderContent>
                    <PageTitleGroup>
                        <H1>{content.pageHeader}</H1>
                        <PageSubheader>{content.pageSubheader}</PageSubheader>
                        {exploreProfilesButton}
                    </PageTitleGroup>
                </HomePageHeaderContent>
            </PageHeader>

            <HomePageContent>
                <H3>{content.communicationStepsHeader}</H3>
                <ConnectionSteps>
                    {content.communicationSteps.map((step, key) => {
                        return (
                            <ConnectionStep key={key}>
                                <img src={step.stepPictureUrl} alt={`Infographic of step ${key + 1} of the Communication Process.`}/>
                                <H5>{step.stepTitle}</H5>
                                <P>{step.stepDescription}</P>
                            </ConnectionStep>
                        )
                    })}
                </ConnectionSteps>
                <CATIntroWrapper>
                    <CATInformation>
                        <H3>{content.civicsActionTeamInfoHeader}</H3>
                        <P>{content.civicsActionTeamInfoSubheader}</P>
                        <Ul>
                            {content.civicsActionTeamCapabilities.map((c, i) => <Li key={i}><P>{c}</P></Li>)} 
                        </Ul>
                        {exploreProfilesButton}
                        <NavigationLink to={content.furtherHelpLink.linkURL}>{content.furtherHelpLink.linkTitle}</NavigationLink>
                    </CATInformation>
                    <CATCarousel>
                        {carouselItems.map((item, key) => {
                            return (
                                <CATCarouselItem key={key}>
                                    <PersonPreview profile={item}/>
                                </CATCarouselItem>
                            )
                        } )}
                    </CATCarousel>
                </CATIntroWrapper>
            </HomePageContent>
        </HomePageWrapper>
    )
}

export default DisconnectedHomePage;