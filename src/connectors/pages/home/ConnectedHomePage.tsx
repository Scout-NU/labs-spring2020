import React from 'react';
import DisconnectedHomePage from '../../../components/pages/home/HomePage';
import { IHomeContent } from '../../../types/client/page/home';
import PageLoader from '../../../components/molecules/loading-spinner/LoadingSpinner';
import { mapHomeContent } from '../../../types/util/adpater/page/home';
import { IPerson } from '../../../types/client/model/person';
import { resolveAmbassadorType } from '../../../types/util/adpater/model/person';
import ProfileService from '../../../service/ambassador/service';
import PageService from '../../../service/page/service';

const HomePage: React.FC = props => {
    const [ambassadors, setAmbassadors] = React.useState<IPerson[]>([]);
    const [pageContent, setContent] = React.useState<IHomeContent | null>(null);

    React.useEffect(() => {
        async function fetchCarouselContent() {
            const profileRepository = new ProfileService();
            profileRepository.getAllProfiles(3)
            .then(res => {
                setAmbassadors(resolveAmbassadorType(res))
            })
            // REFACTOR: Hide carousel or use default content
            .catch(error => console.log(error));
        }

        // REFACTOR: This logic is duplicated in a lot of places, it could be pulled into a custom Hook.
        async function getPageContent() {
            const pageService = new PageService();
            pageService.getHomePageContent()
            .then(res => {
                setContent(mapHomeContent(res));
            })
            // REFACTOR: show default content
            .catch(error => console.log(error));
        }

        getPageContent();
        fetchCarouselContent();
    }, []);

    if (!pageContent) {
        return (
            <PageLoader isOpen={!pageContent}/>
        )
    }
    
    return (
       <DisconnectedHomePage content={pageContent} carouselItems={ambassadors}/>
    )
}

export default HomePage;