import React from 'react';
import { IProfile } from '../../types/client/client';
import DisconnectedProfilePage from '../../components/pages/ProfilePage';
import getProfileService from '../../state/ambassador/service';
import NotFoundPage from '../../components/pages/404';
import Spinner from '../../components/atoms/Spinner';
import { mapAmbassadorToProfile } from '../adapter/ambassador/adapter';

const ProfilePage: React.FC = () => {
    const [loading, setLoading] = React.useState(true);
    const [profile, setProfile] = React.useState<IProfile | null>(null);

    React.useEffect(() => {
        async function getProfile() {
            const profileRepository = getProfileService();
            let id = window.location.pathname.split('/').pop();
            
            if (!id) { 
                setLoading(false);
            }
            
            else {
                profileRepository.getProfileById(id)
                .then(res => {
                    console.log(mapAmbassadorToProfile(res))
                    setProfile(mapAmbassadorToProfile(res));
                    setLoading(false);
                }).catch(error => { console.log(error); setLoading(false); });
            }
        }

        getProfile();
    }, [])


    if (!profile && !loading) {
        return (<NotFoundPage/>)
    }

    if (profile && !loading) {
        return (
            <DisconnectedProfilePage info={profile}/>
        )
    }

    else {
        return (<Spinner/>)
    }
}

export default ProfilePage;

