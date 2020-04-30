import React from 'react';
import DisconnectedFAQPage from '../../../components/pages/faq/FAQPage';
import getPageService from '../../../service/page/service';
import { mapFaqContent } from '../../../types/util/adpater/page/faq';
import { IFaqContent } from '../../../types/client/page/faq';
import PageLoader from '../../../components/molecules/loading-spinner/LoadingSpinner';

const FAQPage: React.FC = () => {
    const [pageContent, setContent] = React.useState<IFaqContent | null>(null);

    // REFACTOR: This logic is duplicated in a lot of places, it could be pulled into a custom Hook.
    React.useEffect(() => {
        async function getPageContent() {
            const pageService = getPageService();
            pageService.getFaqPageContent()
            .then(res => {
                setContent(mapFaqContent(res));
            }).catch(error => console.log(error));
        }

        getPageContent();
    }, []);

    if (!pageContent) return <PageLoader isOpen={!pageContent}/>

    return (
        <DisconnectedFAQPage content={pageContent}/>
    )
}

export default FAQPage;