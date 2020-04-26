import React from 'react';
import DisconnectedSearchPage from "../../components/pages/SearchPage";
import getProfileService from '../../service/ambassador/service';
import { IAmbassador } from '../../types/backend/model';
import { URLQueryParser } from '../../service/util/url';
import { ISearchPageContent } from '../../types/client/page/search';
import { IPerson } from '../../types/client/model/person';
import { resolveAmbassadorType } from '../../types/util/adpater/model/person';


const SearchPage: React.FC = () => {
    const [ambassadors, setAmbassadors] = React.useState<IPerson[]>([]);
    const [loading, setLoading] = React.useState(true);
    
    React.useEffect(() => {
        const isQueryPresent = () => window.location.search === "";

        async function search() {
            const profileRepository = getProfileService();
            var ambassadors: Promise<IAmbassador[]>;
            if (isQueryPresent()) {
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
        search();
    }, []);

    return(
        <DisconnectedSearchPage loading={loading} results={ambassadors} pageContent={TempSearchPageContent} />
    )
}


const TempSearchPageContent: ISearchPageContent = {
    pageHeader: 'Connect with City Hall',
    pageSubheader: 'Different Boston City Hall departments help the City of Boston in different ways. Find the person in a department that can best answer your questions!',
    searchBarHint: 'Search by topic or name',
    noResultsHeader: 'We can’t find anyone related to your search. Don’t give up!',
    noResultsSuggestions: [
        'Try using a different filter or key word.',
        'Still nothing? Check out our Help page.'
    ],
    noResultsImageUrl: '',
    filters: [],
}

export default SearchPage;