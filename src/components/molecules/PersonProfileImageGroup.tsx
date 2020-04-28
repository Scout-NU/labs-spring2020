import React from 'react';
import styled from '../../styles/theme/Theme';
import CircleImage from '../atoms/CircleImage';


interface IPersonProfileGroupProps {
    profileImageUrl: string;
    departmentImageUrl?: string;
}

// TODO: Can probably improve the way these are sized.
const ProfileImageContainer = styled.div`
    margin-bottom: 1em;
    position: relative;
`

const ProfileImage = styled(CircleImage)`
    width: 50%;
`

const DepartmentImage = styled(CircleImage)`
    position: absolute;
    width: 18%;
    background-color: white;
    border: 1px solid black;
    right: 20%;
    bottom: 0;
`

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