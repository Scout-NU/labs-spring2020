import React from 'react';
import DisconnectedSearchPage from "../../../components/pages/search/SearchPage";
import getProfileService from '../../../service/ambassador/service';
import { IAmbassador } from '../../../types/backend/model';
import { URLQueryParser } from '../../../service/util/url';
import { IPerson } from '../../../types/client/model/person';
import { resolveAmbassadorType } from '../../../types/util/adpater/model/person';
import { ISearchContent } from '../../../types/client/page/search';
import getPageService from '../../../service/page/service';
import PageLoader from '../../../components/molecules/loading-spinner/LoadingSpinner';
import { mapSearchPageContent } from '../../../types/util/adpater/page/search';
import ContactList from '../../../components/organisms/contact-list/ContactList';


const SearchPage: React.FC = () => {
    const [ambassadors, setAmbassadors] = React.useState<IPerson[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [pageContent, setContent] = React.useState<ISearchContent | null>(null);

    React.useEffect(() => {
        async function search() {
            let isQueryPresent = window.location.search === "";
            const profileRepository = getProfileService();
            var ambassadors: Promise<IAmbassador[]>;
            if (isQueryPresent) {
                ambassadors = profileRepository.getAllProfiles();
            } else {
                let params = new URLQueryParser(new URLSearchParams(window.location.search));
                ambassadors = profileRepository.searchProfiles(params.getQuery(), params.getFilters());
            }
            ambassadors.then(res => {
                setAmbassadors(resolveAmbassadorType(res))
                setLoading(false);
            }).catch(error => console.log(error));
        }

        async function getPageContent() {
            const pageService = getPageService();
            pageService.getSearchPageContent()
            .then(res => {
                setContent(mapSearchPageContent(res));
            }).catch(error => console.log(error));
        }

        getPageContent();
        search();
    }, []);

    if (!pageContent) return <PageLoader isOpen={!pageContent}/>

    return(
        <>
            <DisconnectedSearchPage loading={loading} results={ambassadors} pageContent={pageContent} />
            <ContactList/>
        </>
    )
}

export default SearchPage;