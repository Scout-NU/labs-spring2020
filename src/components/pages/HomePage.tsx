import React from 'react';
import styled from '../../styles/theme/Theme';
import { lunchboxColors } from '../../styles/theme/lunchbox';
import { H1, H5, H4, NavigationLink, H3, P } from '../atoms/Typography';
import devices from '../../styles/variables/breakpoints';
import Button, { ButtonStyle } from '../atoms/Button';
import PageHeader, { HeaderVariant } from '../molecules/PageHeader';
import headerPeople from '../../images/home/home-header-people.svg';
import { searchPageRoute, helpPageRoute } from '../../var/routes';
import stepone from '../../images/home/stepone.svg';
import steptwo from '../../images/home/steptwo.svg';
import stepthree from '../../images/home/stepthree.svg';
import { IPerson } from '../../types/client/model';
import PersonPreview from '../molecules/PersonPreview';


interface IDisconnectedHomePageProps {
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

const HeaderContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 6em;

    & button {
        margin-top: 4em;
    }

    & ${NavigationLink} {
        color: white;
    }
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

const PageSubheader = styled(H5)`
    font-weight: normal;
    margin-top: 2em;
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

const CATSearchText = styled(H4)`
    color: dimgray;
    font-weight: bolder;
    margin: 3em 0 0 0;
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

const DisconnectedHomePage: React.FC<IDisconnectedHomePageProps> = props => {
    const exploreProfilesButton = <Button buttonStyle={ButtonStyle.PRIMARY}><NavigationLink to={searchPageRoute}>Explore Profiles</NavigationLink></Button>

    return (
        <HomePageWrapper>
            <SAPBanner>
                <H5>STUDENT ACTION PORTAL</H5>
            </SAPBanner>
            <Divider/>
            <PageHeader headerVariant={HeaderVariant.FIRST}>
                <HeaderPeople src={headerPeople}/>
                <HeaderContent>
                    <H1>Connect with people in Boston City Hall</H1>
                    <PageSubheader>Create meaningful change in your community, backed by your friends in local government.</PageSubheader>
                    {exploreProfilesButton}
                </HeaderContent>
            </PageHeader>

            <HomePageContent>
                <H3>How it works</H3>
                <ConnectionSteps>
                    <ConnectionStep>
                        <img src={stepone}/>
                        <H5>Forming your focus</H5>
                        <P>Think about what civics-related topics you want to know more about and use those to help guide your search.</P>
                    </ConnectionStep>
                    <ConnectionStep>
                        <img src={steptwo}/>
                        <H5>Finding an expert</H5>
                        <P>Browse through City Hall profiles to find somebody you’d like to learn from.</P>
                    </ConnectionStep>
                    <ConnectionStep>
                        <img src={stepthree}/>
                        <H5>Connecting with City Hall</H5>
                        <P>Send an email to your chosen City Hall contact and they will provide you with information and guidance.</P>
                    </ConnectionStep>
                </ConnectionSteps>
                <CATIntroWrapper>
                    <CATInformation>
                        <H3>The Civics Action Team is here to help.</H3>
                        <P>One of the best ways to research a topic is understanding how it impacts your own community. A local expert can connect you to resources, opportunities, and information to help you make change in your community.</P>
                        <CATSearchText>Start your search.</CATSearchText>
                        {exploreProfilesButton}
                        <NavigationLink to={helpPageRoute}>Not quite sure what to say?</NavigationLink>
                    </CATInformation>
                    <CATCarousel>
                        {props.carouselItems.map((item, key) => {
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