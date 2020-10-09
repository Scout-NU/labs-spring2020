import styled from '../../../styles/theme/Theme';
import CircleImage from '../../atoms/img/CircleImage';


// TODO: Can probably improve the way these are sized.
export const ProfileImageContainer = styled.div`
    margin-bottom: 2em;
    width: 100%;
    display: flex;
    justify-content: center;
`

export const ProfileImage = styled(CircleImage)`
    width: min(60%, 200px);
    position: relative;
    left: 9%;
`

export const DepartmentImage = styled(CircleImage)`
    border-radius: 50%;
    position: relative;
    width: min(25%, 80px);
    background-color: white;
    border: 1px solid black;
    right: 5%;
    bottom: 0px;
    align-self: flex-end;
`