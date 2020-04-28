import React from 'react';
import styled from '../../styles/theme/Theme';
import { lunchboxColors } from '../../styles/theme/lunchbox';
import { useContactListState } from '../../context/contactListContext';
import { H5, P } from '../atoms/Typography';
import { Caret } from '../atoms/Icon';


const ContactListWrapper = styled.div`
    position: fixed;
    z-index: 3;
    bottom: 0;
    right: 5%;
`

const ContactListHeader = styled.div`
    color: white;
    background-color: ${lunchboxColors.gusher};
    display: flex;
    align-content: space-between;
    padding: 0 1em;
    font-weight: bolder;
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
    align-content: space-around;
    background-color: white;
    border-bottom: 1px solid gray;
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

const ContactList: React.FC = () => {
    const { list } = useContactListState();
    
    return (
        <ContactListWrapper>
            <ContactListHeader>
                <ContactListHeader>
                    <P>Your Contact List</P> 
                    <ContactCount>{list.length}</ContactCount>
                    <Caret flipped/>
                </ContactListHeader>
            </ContactListHeader>

            {list.map((l,i) => {
                return (
                    <ContactListItem key={i}>
                        <ContactNames>
                            <P>{`${l.firstName} ${l.lastName}`}</P>
                            <P>{l.department?.departmentName}</P>
                        </ContactNames>
                    </ContactListItem>
                )
            })}
        </ContactListWrapper>
    )
}

export default ContactList;