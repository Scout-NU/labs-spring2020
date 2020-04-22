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
import Card from '../atoms/Card';


interface IHomePageProps {

}

const HomePageWrapper = styled.div`
    background-color: ${lunchboxColors.icepack};
`

const HeaderContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    & button {
        margin-top: 4em;
    }

    & ${NavigationLink} {
        color: white;
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
    }
`

const CATIntroWrapper = styled.div`
    background-color: white;
    width: 100%;
    display: flex;
`

const CATIntroSectionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 5em 5em 0 10%;
    width: 50%;

    & button {
        margin: 1em 0;
    }

    & > ${NavigationLink} {
        color: ${lunchboxColors.gusher};
    }

    & button > ${NavigationLink} {
        color: white;
    }
`

const CATSearchText = styled(H4)`
    color: grey;
    font-weight: bolder;
    margin-top: 3em;
`

const CATCarouselWrapper = styled.div`
    display: flex;
    background-color: ${lunchboxColors.carton};
    flex-direction: column;
    width: 50%;
`

const CATCarousel = styled.div`
    display: flex; 
    overflow: scroll;
`

const CATCarouselItem = styled.div`
    display: flex;
    width: 80%;
    padding: 4em 0 4em 4em;
`

const FakeItem = styled(Card)`
    height: 600px;
    width: 600px;
`

const HomePage: React.FC<IHomePageProps> = props => {
    const exploreProfilesButton = <Button buttonStyle={ButtonStyle.PRIMARY}><NavigationLink to={searchPageRoute}>Explore Profiles</NavigationLink></Button>

    return (
        <HomePageWrapper>
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
                    <CATIntroSectionWrapper>
                        <H3>The Civics Action Team is here to help.</H3>
                        <P>One of the best ways to research a topic is understanding how it impacts your own community. A local expert can connect you to resources, opportunities, and information to help you make change in your community.</P>
                        <CATSearchText>Start your search.</CATSearchText>
                        {exploreProfilesButton}
                        <NavigationLink to={helpPageRoute}>Not quite sure what to say?</NavigationLink>
                    </CATIntroSectionWrapper>
                    <CATCarouselWrapper>
                        <CATCarousel>
                            <CATCarouselItem>
                                <FakeItem/>
                            </CATCarouselItem>
                            <CATCarouselItem>
                                <FakeItem/>
                            </CATCarouselItem>
                            <CATCarouselItem>
                                <FakeItem/>
                            </CATCarouselItem>
                        </CATCarousel>
                    </CATCarouselWrapper>
                </CATIntroWrapper>
            </HomePageContent>
        </HomePageWrapper>
    )
}

export default HomePage;