import React from 'react';
import DisconnectedFAQPage from '../../components/pages/FAQPage';
import getPageService from '../../service/page/service';
import { mapFaqContent } from '../../types/util/adpater/page/faq';
import { IFaqContent } from '../../types/client/page/faq';
import PageLoader from '../../components/molecules/PageLoader';

const FAQPage: React.FC = props => {
    const [pageContent, setContent] = React.useState<IFaqContent | null>(null);

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