import React from 'react';
import { INotFoundContent } from '../../../types/client/page/notFound';
import getPageService from '../../../service/page/service';
import { mapNotFoundPageContent } from '../../../types/util/adpater/page/notFound';
import PageLoader from '../../../components/molecules/loading-spinner/LoadingSpinner';
import DisconnectedNotFoundPage from '../../../components/pages/not-found/404';


const NotFoundPage: React.FC = props => {
    const [pageContent, setContent] = React.useState<INotFoundContent | null>(null);

    // On first load, fetch page content.
    // REFACTOR: This logic is duplicated in a lot of places, it could be pulled into a custom Hook.
    React.useEffect(() => {
        async function getPageContent() {
            const pageService = getPageService();
            pageService.getNotFoundPageContent()
            .then(res => {
                setContent(mapNotFoundPageContent(res));
            })
            // REFACTOR: Add default content
            .catch(error => console.log(error));
        }

        getPageContent();
    })

    if (!pageContent) return <PageLoader isOpen={!pageContent}/>

    return <DisconnectedNotFoundPage content={pageContent}/>
}

export default NotFoundPage;