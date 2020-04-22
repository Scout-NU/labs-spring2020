import React from 'react';
import { IPerson } from '../../types/client/model';
import getProfileService from '../../service/ambassador/service';
import { resolveAmbassadorType } from '../type-adapter/ambassador/adapter';
import DisconnectedHomePage from '../../components/pages/HomePage';

const HomePage: React.FC = props => {
    const [ambassadors, setAmbassadors] = React.useState<IPerson[]>([]);

    React.useEffect(() => {
        async function fetchCarouselContent() {
            const profileRepository = getProfileService();
            profileRepository.getAllProfiles(3)
            .then(res => {
                setAmbassadors(resolveAmbassadorType(res))
            }).catch(error => console.log(error));
        }

        fetchCarouselContent();
    }, []);
    
    return (
       <DisconnectedHomePage carouselItems={ambassadors}/>
    )
}

export default HomePage;