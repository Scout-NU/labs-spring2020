import React from 'react';
import DisconnectedSearchPage from "../../components/pages/SearchPage";
import useProfileRepository from '../../state/ambassador/service';
import { isAsset, isEntry, ILink } from '../../types/cms';
import { IAmbassador, IProblemTag } from '../../types/cms/generated';
import { URLQueryParser } from '../../state/util/filters';
import { ISearchPageContent } from '../../types/client/page/searchPage';
import { IPerson } from '../../types/client/client';


const SearchPage: React.FC = () => {
    const [ambassadors, setAmbassadors] = React.useState<IPerson[]>([]);
    const [loading, setLoading] = React.useState(true);

    const searchAmbassadors = () => {
        let profileRepository = useProfileRepository();
        if (window.location.search === "") {
            profileRepository.getAllProfiles()
            .then(res => {
                setAmbassadors(mapAmbassadors(res))
                setLoading(false);
            }).catch(error => console.log(error));
        } else {
            let params = new URLQueryParser(new URLSearchParams(window.location.search));
            profileRepository.searchProfiles(params.getQuery(), params.getFilters())
            .then(res => {
                setAmbassadors(mapAmbassadors(res));
                setLoading(false);
            }).catch(error => console.log(error));
        }
    }

    // TODO: Parse current URL Params and do some kind of query based on that
    React.useEffect(() => {
        async function search() {
            searchAmbassadors();
        }
        search();
    }, []);

    // TODO: Move this into some kind of connector method
    const mapAmbassadors = (ambassadors: IAmbassador[]): IPerson[] => {
        return ambassadors.map((item) => {
            let data = item.fields;
            let asset = item.fields.profilePicture!!;
            let tags = item.fields.tags;

            if (isAsset(asset)) {
                return {
                    id: item.sys.id,
                    profileImageUrl: asset.fields.file.url!!,
                    firstName: data.firstName ? data.firstName : '',
                    lastName: data.lastName ? data.lastName : '',
                    positionTitle: data.positionTitle? data.positionTitle : '',
                    description: data.ambassadorDescription? data.ambassadorDescription : '',
                    genderPronouns: data.preferredPronouns ? data.preferredPronouns.join("/") : '',
                    tags: tags? resolveTags(tags) : []
                }
            }
            console.log(item)
            throw Error("SHOOT YOU SHOULD HAVE FIXED THIS BY NOW")
        })
    }

    const resolveTags = (tags: (ILink<"Entry"> | IProblemTag)[]): string[] => {
        let resolvedTags: string[] = [];

        tags.forEach((tag) => {
            if (isEntry(tag) && tag.fields.tagName) resolvedTags.push(tag.fields.tagName);
        })

        return resolvedTags;
    }

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