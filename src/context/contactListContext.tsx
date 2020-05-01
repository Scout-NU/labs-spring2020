import React from 'react';
import { IPerson } from '../types/client/model/person';
import { useStorageReducer } from 'react-storage-hooks';

/**
 * This is how we manage the global state of the contact list. If you're familiar with Redux, this is similar, just without all the boilerplate.
 * https://kentcdodds.com/blog/how-to-use-react-context-effectively/
 * 
 * This is an excellent article on React Context. 
 */

type Action = {type: 'add', payload: {person: IPerson}} | {type: 'remove', payload: {person: IPerson}};
type Dispatch = (action: Action) => void;
type State = {list: IPerson[]};
type ContactListProviderProps = {children: React.ReactNode};

const ContactListContext = React.createContext<State | undefined>(undefined);
const ContactListDispatchContext = React.createContext<Dispatch | undefined>(undefined);

/**
 * This is what's responsible for updating the state (the contact list) when something requests to change it.
 * If we add a person, we add them to the list. If we remove them, we filter them out. We should never mutate state,
 * only take the old one and return a new one. 
 * @param state The current state
 * @param action The action being performed
 */
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

/**
 * Anything that needs access to the state of the contact list needs to be wrapped in this component at some point.
 * As of now, I have the whole app wrapped in it, but this is definitely not a requirement, it just keeps things simple.
 */
function ContactListProvider({children}: ContactListProviderProps) {
    // This persists the state to local storage
    const [state, dispatch] = useStorageReducer(localStorage, 'CONTACT_LIST', contactListReducer, { list: [] });
    
    return (
        <ContactListContext.Provider value={state}>
            <ContactListDispatchContext.Provider value={dispatch}>
                {children}
            </ContactListDispatchContext.Provider>
        </ContactListContext.Provider>
    )
}

/**
 * Anything that wants to see what the state is should use this hook. If you also need to change it,
 * use the dispatch hook (below) separately.
 * Example:
 * (within a react component, this won't work elsewhere)
 * const { list } = useContactListState();
 * 
 * The list is a list of people, as specified in the State type above.
 */
function useContactListState() {
    const context = React.useContext(ContactListContext);

    if (context === undefined) {
        throw new Error('useContactListState must be used within a ContactListProvider');
    }

    return context;
}

/**
 * Anything that wants to change the state should use this hook.
 * Example: 
 * (within a react component, this won't work elsewhere)
 * const dispatch = useContactListDispatch();
 * 
 * To add a person: 
 * dispatch({type: 'add', payload: {person: person}})
 * 
 * To remove a person:
 * dispatch({type: 'remove', payload: {person: person}})
 */
function useContactListDispatch() {
    const context = React.useContext(ContactListDispatchContext);

    if (context === undefined) {
        throw new Error('useContactListState must be used within a ContactListProvider');
    }

    return context;
}

export { ContactListProvider, useContactListState, useContactListDispatch }