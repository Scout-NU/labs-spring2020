import React from 'react';
import DisconnectedSearchPage from "../../components/pages/SearchPage";
import getProfileService from '../../state/ambassador/service';
import { IAmbassador } from '../../types/cms/generated';
import { URLQueryParser } from '../../state/util/url';
import { ISearchPageContent } from '../../types/client/page/searchPage';
import { IPerson } from '../../types/client/client';
import { mapAmbassadorsToPerson } from '../adapter/ambassador/adapter';


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
                setAmbassadors(mapAmbassadorsToPerson(res))
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
    pageDescription: 'Different Boston City Hall departments help the City of Boston in different ways. Find the person in a department that can best answer your questions!',
    searchBarHintText: 'Search by topic or name',
    noSearchResultsHeader: 'We can’t find anyone related to your search. Don’t give up!',
    noSearchResultsAlternateOptions: [
        'Try using a different filter or key word.',
        'Still nothing? Check out our Help page.'
    ],
    noSearchResultsImageUrl: ''
}

export default SearchPage;