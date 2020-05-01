import React from 'react';
import { P } from '../../atoms/typography/Typography';
import { ContactListItem, ContactInformation, ContactNames, ContactListWrapper, ContactListHeader, ContactListHeaderGroup, ContactCount, ProfileImage } from './styled';
import { profileRoute } from '../../../var/routes';
import { IPerson } from '../../../types/client/model/person';
import { useContactListState, useContactListDispatch } from '../../../context/contactListContext';
import { CrossMark, Caret } from '../../atoms/img/Icon';

/**
 * This component can be included on any page to show the state of the contact list. 
 * It needs to be wrapped in the provider for that context, otherwise it wll not be able to access the state it needs.
 */
const ContactList: React.FC = () => {
    const [showList, toggleList] = React.useState(false);
    const { list } = useContactListState();
    const dispatch = useContactListDispatch();

    const togglePerson = (person: IPerson) => dispatch({type: 'remove', payload: {person: person}})
    const showPerson = (person: IPerson) => window.location.assign(`${profileRoute}/${person.id}`)

    const renderContacts = () => {
        return (
            /**
             * Important gotcha here: this would not work if we didn't use map. Beacuse of the weirdness of persisting the state,
             * we need to do something to create a new copy of the state whenever we try to access it. map is a function that 
             * creates a copy of the list its called on, so it fufills that purpose. If you used forEach here, this would not update correctly.
             */
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