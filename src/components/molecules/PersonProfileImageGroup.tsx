import React from 'react';
import styled from '../../styles/theme/Theme';
import CircleImage, { CircleImageSize } from '../atoms/CircleImage';


interface IPersonProfileGroupProps {
    profileImageUrl: string;
    departmentImageUrl?: string;
    size: CircleImageSize;
}

// TODO: Can probably improve the way these are sized.
const ProfileImageContainer = styled.div`
    margin-bottom: 1em;
    position: relative;
    /* width: 250px;  */
`

const DepartmentImage = styled(CircleImage)`
    position: absolute;
    background-color: white;
    border: 1px solid black;
    right: 20%;
    bottom: 0;
`

const PersonProfileImageGroup: React.FC<IPersonProfileGroupProps> = props => {
    // size={`${Math.round(.25 * props.height)}`}
    return (
        <ProfileImageContainer>
            <CircleImage imageUrl={props.profileImageUrl} size={props.size} />
            {props.departmentImageUrl && <DepartmentImage imageUrl={props.departmentImageUrl} size={CircleImageSize.SMALL}/>}
        </ProfileImageContainer>
    )
}

export default PersonProfileImageGroup;