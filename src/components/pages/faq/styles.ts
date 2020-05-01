import styled from '../../../styles/theme/Theme';
import { A } from '../../atoms/typography/Typography';

export const FilterToggle = styled.button`
    border: none;
    background: none;
    transition: all .3s ease-in-out;

    &:hover {
        font-weight: bolder;
    }
`

export const FilterToggles = styled.div`
    display: flex;
    justify-content: flex-start;
    text-align: center;
    margin-bottom: 2em;    
`

export const FaqWrapper = styled.div`
    margin-bottom: 2em;    
`
export const ContactLink = styled(A)`
    margin-bottom: 4em;
`