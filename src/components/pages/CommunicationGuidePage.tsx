import React from 'react';
import { HeaderVariant, PageHeader, PageTitleGroup, PageSubheader, PageSection } from '../templates/Page';
import { H1, H4, H2 } from '../atoms/Typography';
import styled from '../../styles/theme/Theme';
import devices from '../../styles/variables/breakpoints';
import { lunchboxColors } from '../../styles/theme/lunchbox';
import TextList, { Ul } from '../atoms/List';
import { ICommunicationGuideContent } from '../../types/client/page/communicationGuide';

interface ICommunicationGuidePageProps {
   content: ICommunicationGuideContent;
}

const HeaderPeople = styled.img`
    position: absolute;
    width: 25%;
    z-index: 0;
    right: 10%;
    bottom: -7.5%;
    z-index: 1;

    @media ${devices.tablet} {
        width: 35%;
    }
`

const ClickIcon = styled.div`
    border-radius: 50%;
    background-color: ${lunchboxColors.salad};
    width: fit-content;
    height: fit-content;
    padding: 1.25em;
`

const RemindersWrapper = styled.div`
    display: flex;
    padding: 5% 20%;

    & ${ClickIcon} {
        margin-right: 3em;
    }

    @media ${devices.tablet} {
        flex-direction: column;
        padding: 25% 8% 0;

        & ${ClickIcon} {
            margin-bottom: 2em;
        }
    }
`

const StepWrapper = styled.div`
    margin-bottom: 2em;
    padding: 2em 6em;
    background-color: ${lunchboxColors.carton};

    & ${Ul} {
        margin-left: 4em;
    }

    & h2 {
        margin-bottom: .25em;
    }

    @media ${devices.tablet} {
        padding: 3em;

        & ${Ul} {
            margin-left: 0;
        }

        & h2 {
            margin-bottom: .25em;
        }
    }
`

const StepTitle = styled.div`
    display: flex;
    align-content: flex-start;
`

const StepNumber = styled(H2)`
    font-weight: normal;
    margin-right: 1em;
`

const DisconnectedCommunicationGuidePage: React.FC<ICommunicationGuidePageProps> = props => {
    const { content } = props;
    return (
        <>
            <PageHeader headerVariant={HeaderVariant.CONVERSATION_GUIDE}>
                <PageTitleGroup>
                    <H1>{content.pageHeader}</H1>
                    <PageSubheader>
                        {content.pageSubheader}
                    </PageSubheader>
                </PageTitleGroup>
                <HeaderPeople src={content.headerDecorationPageUrl} alt={'Two students sitting and chatting with one another.'}/>
            </PageHeader>
            <PageSection>
                <RemindersWrapper>
                    <ClickIcon>
                        <img src={content.remindersIconUrl} alt={'An icon of a mouse pointer clicking something.'}/>
                    </ClickIcon>
                    <div>
                        <H4>{content.remindersHeader}</H4>
                        <TextList items={content.reminders}/>
                    </div>
                </RemindersWrapper>
            </PageSection>
            <PageSection>
                {content.connectionSteps.map((step, i) => {
                    return (
                        <StepWrapper key={i}>
                            <StepTitle>
                                <StepNumber>{i + 1}</StepNumber>
                                <H2>{step.stepTitle}</H2>
                            </StepTitle>
                            <TextList items={step.stepDetails}/>
                        </StepWrapper>
                    )
                })}
            </PageSection>
        </>
    )
}

export default DisconnectedCommunicationGuidePage;