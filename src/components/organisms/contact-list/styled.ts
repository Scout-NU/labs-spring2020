import styled from '../../../styles/theme/Theme';
import { lunchboxColors } from '../../../styles/theme/lunchbox';
import CircleImage from '../../atoms/img/CircleImage';
import devices from '../../../styles/variables/breakpoints';
import { P } from '../../atoms/typography/Typography';

export const ContactListWrapper = styled.div`
    position: fixed;
    z-index: 3;
    bottom: 0;
    right: 5%;
    box-shadow: 0 0 26px lightgray;
    width: 25%;


    @media ${devices.laptopL} {
        width: 40%;
    }

    @media ${devices.tablet} {
        width: 100%;
        right:0;
    }
`

export const ContactListHeader = styled.div`
    color: white;
    background-color: ${lunchboxColors.gusher};
    display: flex;
    justify-content: space-between;
    padding: 0 1.5em;
    font-weight: bolder;
    align-items: center;
`

export const ContactListHeaderGroup = styled.div`
    display: flex;
    align-items: center;
`

export const ContactCount = styled.div`
    background-color: white;
    color: black;
    height: fit-content;
    padding: .1em .5em;
    border-radius: 16px;
    margin: 0 3em 0 1em;
`

export const ContactListItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    padding: 1em;
    transition: all .1s ease-in-out;

    &:hover {
        background-color: ${lunchboxColors.carton};
    }
`

export const ContactInformation = styled.div`
    display: flex;
    width: 80%;
`

export const ContactNames = styled.div`
    display: flex;
    flex-direction: column;
    & ${P}:first-child {
        font-weight: bolder;
    }

    & ${P} {
        margin: 0;
    }
`

export const ProfileImage = styled(CircleImage)`
    height: 3.5em;
    width: auto;
    margin-right: 1em;
`