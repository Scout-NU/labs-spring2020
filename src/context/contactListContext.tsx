import React, { Reducer } from 'react';
import { IPerson } from '../types/client/model/person';

type Action = {type: 'add', payload: {person: IPerson}} | {type: 'remove', payload: {person: IPerson}};
type Dispatch = (action: Action) => void;
type State = {list: IPerson[]};
type ContactListProviderProps = {children: React.ReactNode};

const ContactListContext = React.createContext<State>(restoreState());
const ContactListDispatchContext = React.createContext<Dispatch | undefined>(undefined);

function contactListReducer(state: State, action: Action) {
    switch (action.type) {
        case 'add': {
            console.log(state.list)
            let added = { list: [...state.list, action.payload.person]};
            // persistList(added);
            return added;
        }
        case 'remove': {
            let removed = {list: state.list.filter(p => p.id !== action.payload.person.id)}
            // persistList(removed);
            return removed;
        }
        default: {
            throw new Error(`Unhandled action type: ${action}`);
        }
    }
}

function persistList(state: State) {
    localStorage.setItem('CONTACT_LIST', JSON.stringify(state));
}

function restoreState(): State {
    return JSON.parse(localStorage.getItem('CONTACT_LIST')!!);
}

function ContactListProvider({children}: ContactListProviderProps) {
    const [state, dispatch] = useLocallyPersistedReducer(contactListReducer, restoreState(), 'CONTACT_LIST');

    return (
        <ContactListContext.Provider value={state}>
            <ContactListDispatchContext.Provider value={dispatch}>
                {children}
            </ContactListDispatchContext.Provider>
        </ContactListContext.Provider>
    )
}

function useLocallyPersistedReducer(reducer: Reducer<any, any>, defaultState: State, storageKey: string) {
    const hookVars = React.useReducer(reducer, defaultState, (defaultState) => {
      const persisted = JSON.parse(localStorage.getItem(storageKey)!!)
      return persisted !== null ? persisted : defaultState
    })
  
    React.useEffect(() => {
      localStorage.setItem(storageKey, JSON.stringify(hookVars[0]))
    }, [storageKey, hookVars[0]])
  
    return hookVars
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