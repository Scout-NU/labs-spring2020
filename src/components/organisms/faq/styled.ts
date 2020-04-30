import styled from '../../../styles/theme/Theme';
import { lunchboxColors } from '../../../styles/theme/lunchbox';
import devices from '../../../styles/variables/breakpoints';

// src: stackoverflow.com/questions/55281672/make-plus-symbol-in-css
export const PlusButton = styled.button`
    border: none;
    display: inline-block;
    min-width: 50px;
    min-height: 50px;
    border-radius: 50%;
    
    background:
        linear-gradient(#fff,#fff),
        linear-gradient(#fff,#fff),
        ${lunchboxColors.jello};
    background-position:center;
    background-size: 50% 2px,2px 50%; /*thickness = 2px, length = 50% (25px)*/
    background-repeat:no-repeat;
`

export const FAQWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${lunchboxColors.carton};
    padding: 2em 3em;
    transition: all .1s ease-in-out;

    &:hover {
        transform: scale(1.05);
    }

    @media ${devices.tablet} {
        padding: 2em;

        & ${PlusButton} {
            margin-left: 1em;
        }
    } 
`

export const LinkWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
`

export const FAQLink = styled.div`
    display: flex;
    flex-direction: column;
    width: 33%;
    padding: 1em;

    @media ${devices.laptop} {
        width: 100%;
    }
`

export const FAQContent = styled.div`
    padding: 0 5%;
`