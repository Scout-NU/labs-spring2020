import React from 'react';
import { HeaderVariant, PageHeader, PageSection } from '../../templates/page/Page';
import { H1, H4, H2 } from '../../atoms/typography/Typography';
import TextList from '../../atoms/ul/List';
import { ICommunicationGuideContent } from '../../../types/client/page/communicationGuide';
import { HeaderPeople, RemindersWrapper, ClickIcon, StepWrapper, StepTitle, StepNumber } from './styled';
import { PageTitleGroup, PageSubheader } from '../../templates/page/styled';

interface ICommunicationGuidePageProps {
   content: ICommunicationGuideContent;
}

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