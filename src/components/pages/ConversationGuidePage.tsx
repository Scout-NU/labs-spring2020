import React from 'react';
import { HeaderVariant, PageHeader, PageTitleGroup, PageSubheader, PageSection } from '../templates/Page';
import { H1, P, H4, H2 } from '../atoms/Typography';
import styled from '../../styles/theme/Theme';
import headerPerson from '../../images/conversation-guide/headerperson.svg';
import clickicon from '../../images/conversation-guide/clickicon.svg';
import devices from '../../styles/variables/breakpoints';
import { lunchboxColors } from '../../styles/theme/lunchbox';
import { Ul, Li } from '../atoms/List';

interface IConversationGuidePageProps {
   
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

const DisconnectedConversationGuidePage: React.FC<IConversationGuidePageProps> = props => {
    
    return (
        <>
            <PageHeader headerVariant={HeaderVariant.CONVERSATION_GUIDE}>
                <PageTitleGroup>
                    <H1>Tips for connecting with City Hall</H1>
                    <PageSubheader>
                        People in City Hall are excited to help you with your civics project. You have the power to connect by emailing them today.
                    </PageSubheader>
                </PageTitleGroup>
                <HeaderPeople src={headerPerson} alt={'Two students sitting and chatting with one another.'}/>
            </PageHeader>
            <PageSection>
                <RemindersWrapper>
                    <ClickIcon>
                        <img src={clickicon} alt={'An icon of a mouse pointer clicking something.'}/>
                    </ClickIcon>
                    <div>
                        <H4>Friendly Reminders</H4>
                        <Ul>
                            <Li>
                                <P>They want to help you! No question is a bad question.</P>
                            </Li>
                            <Li>
                                <P>The first person you contact may not be able to give you all the answers you’re looking for. That’s okay! They may be able to connect you with other people who can help.</P>
                            </Li>
                            <Li>
                                <P>Make sure to thank the person for their time and help in your project.</P>
                            </Li>
                            <Li>
                                <P>You can expect the City Hall person to respond within 5 business days.</P>
                            </Li>
                        </Ul>
                    </div>
                </RemindersWrapper>
            </PageSection>
            <PageSection>
                <StepWrapper>
                    <StepTitle>
                        <StepNumber>1</StepNumber>
                        <H2>Introduce yourself and your idea</H2>
                    </StepTitle>
                    <Ul>
                        <Li>
                            <P>Say hello, introduce yourself with your name and grade, and share the idea that you have for a project. What change do you want to make through your project?</P>
                        </Li>
                        <Li>
                            <P>Include your interests behind your topic. Why did you choose this issue? What are your experiences with it?</P>
                        </Li>
                    </Ul>
                </StepWrapper>
            </PageSection>
        </>
    )
}

export default DisconnectedConversationGuidePage;