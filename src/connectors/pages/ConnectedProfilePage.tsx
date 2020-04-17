import React from 'react';
import { IProfile } from '../../types/client/model';
import DisconnectedProfilePage from '../../components/pages/ProfilePage';
import getProfileService from '../../service/ambassador/service';
import NotFoundPage from '../../components/pages/404';
import Spinner from '../../components/atoms/Spinner';
import { mapAmbassadorToProfile } from '../type-adapter/ambassador/adapter';
import EmailForm from '../../connectors/organisms/ConnectedEmailForm';

const ProfilePage: React.FC = () => {
    const [loading, setLoading] = React.useState(true);
    const [profile, setProfile] = React.useState<IProfile | null>(null);
    const [showForm, toggleForm] = React.useState(false);

    const emailRequested = () => {
        toggleForm(!showForm);
    }

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
            <>
                {showForm && <EmailForm/>}
                <DisconnectedProfilePage onEmailButtonPressed={emailRequested} info={profile}/>
            </>
        )
    }

    else {
        return (<Spinner/>)
    }
}

export default ProfilePage;

