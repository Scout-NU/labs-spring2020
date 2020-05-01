import React from 'react';
import { IPerson } from '../../../types/client/model/person';
import { useContactListState, useContactListDispatch } from '../../../context/contactListContext';
import { ToggleButton } from './styled';


interface IContactListToggleProps {
    person: IPerson;
}

/**
 * This component can be included anywhere to update the global contact list context. It will add or remove the person 
 * passed to it in props to the context depending on their presence in the contact list.
 */
const ContactListToggle: React.FC<IContactListToggleProps> = props => {
    const { person } = props;
    const { list } = useContactListState();
    const dispatch = useContactListDispatch();

    /**
     * Important gotcha here: this would not work if we didn't use filter. Beacuse of the weirdness of persisting the state,
     * we need to do something to create a new copy of the state whenever we try to access it. filter is a function that 
     * creates a copy of the list its called on, so it fufills that purpose. However, if you used something like Array.contains()
     * to check if the list includes the person, it wouldn't update correctly.
     */
    const includesPerson = () => {
        return list.filter(p => p.id === person.id).length === 1;   
    }

    const togglePerson = () => {
        if (includesPerson()) dispatch({type: 'remove', payload: {person: person}})
        else dispatch({type: 'add', payload: {person: person}})
    }

    return (
        <ToggleButton highlighted={includesPerson()} onClick={togglePerson}/>
    )
}

export default ContactListToggle;