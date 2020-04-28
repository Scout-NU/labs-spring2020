import React from 'react';
import styled from '../../styles/theme/Theme';
import { lunchboxColors } from '../../styles/theme/lunchbox';
import { useContactListState, useContactListDispatch } from '../../context/contactListContext';
import { P } from '../atoms/Typography';
import { Caret, CrossMark } from '../atoms/Icon';
import CircleImage from '../atoms/CircleImage';
import { IPerson } from '../../types/client/model/person';
import devices from '../../styles/variables/breakpoints';
import { profileRoute } from '../../var/routes';


const ContactListWrapper = styled.div`
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

const ContactListHeader = styled.div`
    color: white;
    background-color: ${lunchboxColors.gusher};
    display: flex;
    justify-content: space-between;
    padding: 0 1.5em;
    font-weight: bolder;
    align-items: center;
`

const ContactListHeaderGroup = styled.div`
    display: flex;
    align-items: center;
`

const ContactCount = styled.div`
    background-color: white;
    color: black;
    height: fit-content;
    padding: .1em .5em;
    border-radius: 16px;
    margin: 0 3em 0 1em;
`

const ContactListItem = styled.div`
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

const ContactInformation = styled.div`
    display: flex;
    width: 80%;
`

const ContactNames = styled.div`
    display: flex;
    flex-direction: column;
    & ${P}:first-child {
        font-weight: bolder;
    }

    & ${P} {
        margin: 0;
    }
`

const ProfileImage = styled(CircleImage)`
    height: 3.5em;
    width: auto;
    margin-right: 1em;
`
const ContactList: React.FC = () => {
    const [showList, toggleList] = React.useState(false);
    const { list } = useContactListState();
    const dispatch = useContactListDispatch();

    const togglePerson = (person: IPerson) => dispatch({type: 'remove', payload: {person: person}})
    const showPerson = (person: IPerson) => window.location.assign(`${profileRoute}/${person.id}`)

    const renderContacts = () => {
        return (
            list.map((l,i) => {
                return (
                    <ContactListItem key={i}>
                        <ContactInformation onClick={() => showPerson(l)}>
                            <ProfileImage src={l.profileImageUrl}/>
                            <ContactNames>
                                <P>{`${l.firstName} ${l.lastName}`}</P>
                                <P>{l.department?.departmentName}</P>
                            </ContactNames>
                        </ContactInformation>
                        <CrossMark onClick={() => togglePerson(l)}/>
                    </ContactListItem>
                )
            })
        )
    }

    return (
        <ContactListWrapper>
            <ContactListHeader onClick={() => toggleList(!showList)}>
                <ContactListHeaderGroup>
                    <P>Your Contact List</P> 
                    <ContactCount>{list.length}</ContactCount>
                </ContactListHeaderGroup>
                <Caret flipped={!showList}/>
            </ContactListHeader>
            { showList && renderContacts()}
        </ContactListWrapper>
    )
}

export default ContactList;