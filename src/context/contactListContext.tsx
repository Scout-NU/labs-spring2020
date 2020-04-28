import React from 'react';
import { IPerson } from '../types/client/model/person';
import { useStorageReducer } from 'react-storage-hooks';

type Action = {type: 'add', payload: {person: IPerson}} | {type: 'remove', payload: {person: IPerson}};
type Dispatch = (action: Action) => void;
type State = {list: IPerson[]};
type ContactListProviderProps = {children: React.ReactNode};

const ContactListContext = React.createContext<State | undefined>(undefined);
const ContactListDispatchContext = React.createContext<Dispatch | undefined>(undefined);

function contactListReducer(state: State, action: Action) {
    switch (action.type) {
        case 'add': {
            return { list: [...state.list, action.payload.person]};
        }
        case 'remove': {
            return {list: state.list.filter(p => p.id !== action.payload.person.id)}
        }
        default: {
            throw new Error(`Unhandled action type: ${action}`);
        }
    }
}

function ContactListProvider({children}: ContactListProviderProps) {
    const [state, dispatch] = useStorageReducer(localStorage, 'CONTACT_LIST', contactListReducer, { list: [] });
    
    return (
        <ContactListContext.Provider value={state}>
            <ContactListDispatchContext.Provider value={dispatch}>
                {children}
            </ContactListDispatchContext.Provider>
        </ContactListContext.Provider>
    )
}

function useContactListState() {
    const context = React.useContext(ContactListContext);

    if (context === undefined) {
        throw new Error('useContactListState must be used within a ContactListProvider');
    }

    return context;
}

function useContactListDispatch() {
    const context = React.useContext(ContactListDispatchContext);

    if (context === undefined) {
        throw new Error('useContactListState must be used within a ContactListProvider');
    }

    return context;
}

export { ContactListProvider, useContactListState, useContactListDispatch }