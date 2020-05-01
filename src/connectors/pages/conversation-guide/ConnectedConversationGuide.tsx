import React from 'react';
import getPageService from '../../../service/page/service';
import { ICommunicationGuideContent } from '../../../types/client/page/communicationGuide';
import { mapCommunicationGuideContent } from '../../../types/util/adpater/page/communicationGuide';
import PageLoader from '../../../components/molecules/loading-spinner/LoadingSpinner';
import DisconnectedCommunicationGuidePage from '../../../components/pages/communication-guide/CommunicationGuidePage';


const ConversationGuide: React.FC = props => {
    const [pageContent, setContent] = React.useState<ICommunicationGuideContent | null>(null);

    // REFACTOR: This logic is duplicated in a lot of places, it could be pulled into a custom Hook.
    React.useEffect(() => {
        async function getPageContent() {
            const pageService = getPageService();
            pageService.getConversationPageContent()
            .then(res => {
                setContent(mapCommunicationGuideContent(res));
            }).catch(error => console.log(error));
        }

        getPageContent();
    }, []);

    if (!pageContent) return <PageLoader isOpen={!pageContent}/>

    return (
        <DisconnectedCommunicationGuidePage content={pageContent}/>
    )
}

export default ConversationGuide;