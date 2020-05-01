import React from 'react';
import DisconnectedSearchPage from "../../../components/pages/search/SearchPage";
import { IAmbassador } from '../../../types/backend/model';
import { URLQueryParser } from '../../../service/util/url';
import { IPerson } from '../../../types/client/model/person';
import { resolveAmbassadorType } from '../../../types/util/adpater/model/person';
import { ISearchContent } from '../../../types/client/page/search';
import PageLoader from '../../../components/molecules/loading-spinner/LoadingSpinner';
import { mapSearchPageContent } from '../../../types/util/adpater/page/search';
import ContactList from '../../../components/organisms/contact-list/ContactList';
import ProfileService from '../../../service/ambassador/service';
import PageService from '../../../service/page/service';

/**
 * This is the connected component responsible for doing a search. It parses the query parameter stored in the URL and talks to the Ambassador 
 * Service to do searches. 
 * 
 * By default, if no search has been performed, it shows all of the profiles.
 * 
 * TODO/REFACTOR: This doesn't support pagination, and if the number of profiles begins to exceed ~30, it definitely should. The services already take a limit argument,
 * this component just needs to keep track of the range of results its asked for (0-30, 30-60, etc).
 */
const SearchPage: React.FC = () => {
    const [ambassadors, setAmbassadors] = React.useState<IPerson[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [pageContent, setContent] = React.useState<ISearchContent | null>(null);

    // On first load...
    React.useEffect(() => {
        async function search() {
            // If there's a query string, we need to search
            let isQueryPresent = window.location.search !== "";
            const profileRepository = new ProfileService();
            var ambassadors: Promise<IAmbassador[]>;
            if (!isQueryPresent) { // No query, grab everyone
                ambassadors = profileRepository.getAllProfiles();
            } else { // Query, get the params and search
                let params = new URLQueryParser(new URLSearchParams(window.location.search));
                ambassadors = profileRepository.searchProfiles(params.getQuery(), params.getFilters());
            }
            ambassadors.then(res => {
                setAmbassadors(resolveAmbassadorType(res))
            })
            // TODO/REFACTOR: there's no error message here... it'll show that there were no search results but we should report network errors to the user.
            .catch(error => console.log(error))
            .finally(() => setLoading(false)); 
        }
        
        // REFACTOR: This logic is duplicated in a lot of places, it could be pulled into a custom Hook.
        async function getPageContent() {
            const pageService = new PageService();
            pageService.getSearchPageContent()
            .then(res => {
                setContent(mapSearchPageContent(res));
            })
            // Again, no visual error; page will also load forever. We should show default content here.
            .catch(error => console.log(error));
        }

        // Fetch content and do search
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