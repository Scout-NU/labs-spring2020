import React from 'react';
import { HeaderVariant, PageHeader, PageTitleGroup, PageSubheader, PageSection } from '../templates/Page';
import { H1, P } from '../atoms/Typography';
import styled from '../../styles/theme/Theme';
import headerPerson from '../../images/conversation-guide/headerperson.svg';
import clickicon from '../../images/conversation-guide/headerperson.svg';
import devices from '../../styles/variables/breakpoints';

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
                <HeaderPeople src={headerPerson}/>
            </PageHeader>
            <PageSection>
                
            </PageSection>
        </>
    )
}

export default DisconnectedConversationGuidePage;