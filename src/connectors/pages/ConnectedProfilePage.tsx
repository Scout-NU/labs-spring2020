import React from 'react';
import DisconnectedProfilePage from '../../components/pages/ProfilePage';
import getProfileService from '../../service/ambassador/service';
import { IProfile } from '../../types/client/model/person';
import { mapAmbassadorToProfile } from '../../types/util/adpater/model/person';
import { IProfileContent } from '../../types/client/page/profile';
import getPageService from '../../service/page/service';
import { mapProfilePageContent } from '../../types/util/adpater/page/profile';
import PageLoader from '../../components/molecules/PageLoader';
import NotFoundPage from './ConnectedNotFoundPage';
import ContactList from '../../components/organisms/ContactList';


const ProfilePage: React.FC = () => {
    const [profile, setProfile] = React.useState<IProfile | null>(null);
    const [pageContent, setContent] = React.useState<IProfileContent | null>(null);
    const [profileFetchFailed, setFailed] = React.useState(false);

    React.useEffect(() => {
        async function getProfile() {
            const profileRepository = getProfileService();
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

