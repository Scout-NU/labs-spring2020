import React from 'react';
import DisconnectedProfilePage from '../../../components/pages/ambassador-profile/ProfilePage';
import getProfileService from '../../../service/ambassador/service';
import { IProfile } from '../../../types/client/model/person';
import { mapAmbassadorToProfile } from '../../../types/util/adpater/model/person';
import { IProfileContent } from '../../../types/client/page/profile';
import getPageService from '../../../service/page/service';
import { mapProfilePageContent } from '../../../types/util/adpater/page/profile';
import PageLoader from '../../../components/molecules/loading-spinner/LoadingSpinner';
import NotFoundPage from '../not-found/ConnectedNotFoundPage';
import ContactList from '../../../components/organisms/contact-list/ContactList';


/**
 * Responsible for fetching the content of the ambassador ID in the URL, and fetching the copy for the profile template.
 */
const ProfilePage: React.FC = () => {
    const [profile, setProfile] = React.useState<IProfile | null>(null);
    const [pageContent, setContent] = React.useState<IProfileContent | null>(null);
    const [profileFetchFailed, setFailed] = React.useState(false);

    React.useEffect(() => {
        // Fetch the ambassador's content
        async function getProfile() {
            const profileRepository = getProfileService();
            // This component is dependent on the route. One thing that you could do is delegate this URL parsing to React Router. 
            // I chose not to do this because I was going fast. This could be a good REFACTOR if this profile ever needs to be used anywhere else.
            let id = window.location.pathname.split('/').pop();
            
            if (!id) {
                setFailed(true)
            }
            
            else {
                profileRepository.getProfileById(id)
                .then(res => {
                    setProfile(mapAmbassadorToProfile(res));
                }).catch(error => { console.log(error); setFailed(true); });
            }
        }

        // REFACTOR: This logic is duplicated in a lot of places, it could be pulled into a custom Hook.
        async function getPageContent() {
            const pageService = getPageService();
            pageService.getProfilePageContent()
            .then(res => {
                setContent(mapProfilePageContent(res));
            }).catch(error => console.log(error));
        }

        getPageContent();

        getProfile();
    }, [])


    if (profileFetchFailed) {
        return (<NotFoundPage/>)
    }

    if (profile && pageContent) {
        return (
            <>
                <DisconnectedProfilePage content={pageContent} info={profile}/>
                <ContactList/>
            </>
        )
    }

    else {
        return (<PageLoader isOpen={!profile && !pageContent}/>)
    }
}

export default ProfilePage;

