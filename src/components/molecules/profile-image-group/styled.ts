import styled from '../../../styles/theme/Theme';
import CircleImage from '../../atoms/img/CircleImage';


// TODO: Can probably improve the way these are sized.
export const ProfileImageContainer = styled.div`
    margin-bottom: 2em;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    display: flex;
    justify-content: center;
    
`

export const ProfileImage = styled(CircleImage)`
    width: min(50%, 200px);
`

export const DepartmentImage = styled(CircleImage)`
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