import React from 'react';
import { IPerson } from '../../types/client/model';
import getProfileService from '../../service/ambassador/service';
import DisconnectedHomePage from '../../components/pages/HomePage';
import getPageService, { PageName } from '../../service/page/service';
import { IHomeContent } from '../../types/client/page/home';
import PageLoader from '../../components/molecules/PageLoader';
import { resolveAmbassadorType } from '../../types/util/ambassador/adapter';

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
            pageService.getContentForPage(PageName.HOME)
            .then(res => {
                
            })
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