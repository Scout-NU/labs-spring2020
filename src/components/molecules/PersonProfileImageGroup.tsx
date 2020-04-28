import React from 'react';
import styled from '../../styles/theme/Theme';
import CircleImage from '../atoms/CircleImage';


interface IPersonProfileGroupProps {
    profileImageUrl: string;
    departmentImageUrl?: string;
}

// TODO: Can probably improve the way these are sized.
const ProfileImageContainer = styled.div`
    margin-bottom: 2em;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    display: flex;
    justify-content: center;
    
`

const ProfileImage = styled(CircleImage)`
    width: min(50%, 200px);
`

const DepartmentImage = styled(CircleImage)`
    border-radius: 50%;
    position: relative;
    width: 18%;
    height: 18%;
    background-color: white;
    border: 1px solid black;
    right: 11%;
    bottom: 0px;
    align-self: flex-end;
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