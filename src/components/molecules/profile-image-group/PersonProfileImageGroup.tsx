import React from 'react';
import { ProfileImageContainer, ProfileImage, DepartmentImage } from './styled';

interface IPersonProfileGroupProps {
    profileImageUrl: string;
    departmentImageUrl?: string;
}

const PersonProfileImageGroup: React.FC<IPersonProfileGroupProps> = props => {
    const {profileImageUrl, departmentImageUrl} = props;

    return (
        <ProfileImageContainer>
            <ProfileImage src={profileImageUrl} />
            {departmentImageUrl && <DepartmentImage src={departmentImageUrl}/>}
        </ProfileImageContainer>
    )
}

export default PersonProfileImageGroup;