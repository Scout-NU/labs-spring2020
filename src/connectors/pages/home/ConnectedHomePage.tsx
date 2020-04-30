import React from 'react';
import getProfileService from '../../../service/ambassador/service';
import DisconnectedHomePage from '../../../components/pages/home/HomePage';
import getPageService from '../../../service/page/service';
import { IHomeContent } from '../../../types/client/page/home';
import PageLoader from '../../../components/molecules/loading-spinner/LoadingSpinner';
import { mapHomeContent } from '../../../types/util/adpater/page/home';
import { IPerson } from '../../../types/client/model/person';
import { resolveAmbassadorType } from '../../../types/util/adpater/model/person';

const HomePage: React.FC = props => {
    const [ambassadors, setAmbassadors] = React.useState<IPerson[]>([]);
    const [pageContent, setContent] = React.useState<IHomeContent | null>(null);

    React.useEffect(() => {
        async function fetchCarouselContent() {
            const profileRepository = getProfileService();
            profileRepository.getAllProfiles(3)
            .then(res => {
                setAmbassadors(resolveAmbassadorType(res))
            }).catch(error => console.log(error));
        }

        async function getPageContent() {
            const pageService = getPageService();
            pageService.getHomePageContent()
            .then(res => {
                setContent(mapHomeContent(res));
            }).catch(error => console.log(error));
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