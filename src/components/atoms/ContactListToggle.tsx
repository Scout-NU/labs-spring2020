import React from 'react';
import { IPerson } from '../../types/client/model/person';
import { useContactListState, useContactListDispatch } from '../../context/contactListContext';
import { StarIcon } from './Icon';
import styled from '../../styles/theme/Theme';


interface IContactListToggleProps {
    person: IPerson;
}

const ToggleButton = styled(StarIcon)`
    transition: all .1s ease-in-out;
    &:hover {
        transform: scale(1.1);
    }
`

const ContactListToggle: React.FC<IContactListToggleProps> = props => {
    const { person } = props;
    const { list } = useContactListState();
    const dispatch = useContactListDispatch();
    const [highlighted] = React.useState(false);

    // React.useEffect(() => {
    //     localStorage.setItem('CONTACT_LIST', JSON.stringify(list));
    // }, [list])

    const includesPerson = () => {
        // console.log(list)
        return list.includes(person);   
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