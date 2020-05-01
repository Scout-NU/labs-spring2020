import React from 'react';
import { H1, H5, NavigationLink, H3, P } from '../../atoms/typography/Typography';
import AmbassadorPreview from '../../organisms/ambassador-preview/AmbassadorPreview';
import { IHomeContent } from '../../../types/client/page/home';
import { IPerson } from '../../../types/client/model/person';
import TextList from '../../atoms/ul/List';
import { HomePageWrapper, SAPBanner, Divider, HomePageHeaderContent, ConnectionSteps, CATIntroWrapper, CATInformation, CATCarousel, CATCarouselItem, HomePageContent, ConnectionStep } from './styles';
import { HeaderPeople } from '../communication-guide/styled';
import Button from '../../atoms/button/Button';
import { ButtonStyle } from '../../atoms/button/styled';
import { PageHeader, HeaderVariant } from '../../templates/page/Page';
import { PageTitleGroup, PageSubheader } from '../../templates/page/styled';

interface IDisconnectedHomePageProps {
    content: IHomeContent;
    carouselItems: IPerson[];
}

/**
 * Presentational Home Page, expects CMS content.
 */
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
                        <TextList items={content.civicsActionTeamCapabilities}/>
                        {exploreProfilesButton}
                        <NavigationLink to={content.furtherHelpLink.linkURL}>{content.furtherHelpLink.linkTitle}</NavigationLink>
                    </CATInformation>
                    <CATCarousel>
                        {carouselItems.map((item, key) => {
                            return (
                                <CATCarouselItem key={key}>
                                    <AmbassadorPreview profile={item}/>
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