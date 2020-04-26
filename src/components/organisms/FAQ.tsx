import React from 'react';
import styled from '../../styles/theme/Theme';
import { lunchboxColors } from '../../styles/theme/lunchbox';
import { H5, P, A } from '../atoms/Typography';
import devices from '../../styles/variables/breakpoints';
import { IFaq } from '../../types/client/page/faq';
import TextList from '../atoms/List';


interface IFAQProps {
    faq: IFaq;
    open: boolean;
    onToggled: () => void;
}

// src: stackoverflow.com/questions/55281672/make-plus-symbol-in-css
const PlusButton = styled.button`
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

const FAQWrapper = styled.div`
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

const LinkWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
`

const FAQLink = styled.div`
    display: flex;
    flex-direction: column;
    width: 33%;
    padding: 1em;

    @media ${devices.laptop} {
        width: 100%;
    }
`

const FAQContent = styled.div`
    padding: 0 5%;
`

const FAQ: React.FC<IFAQProps> = props => {
    const {title, suggestions, description, links } = props.faq;

    const renderLinks = () => {
        return (
            <LinkWrapper>
                {links.map((l, i) => {
                    return (
                        <FAQLink key={i}>
                            <A href={l.url.linkURL} target="_blank">{l.url.linkTitle}</A>
                            <P>{l.description}</P>
                        </FAQLink>
                    )
                })}
            </LinkWrapper>
        )
    }

    const renderContent = () => {
        return (
            <FAQContent>
                { suggestions && <TextList items={suggestions}/> }
                { description && <P>{description}</P> }
                { renderLinks() }
            </FAQContent>
        )
    }

    return (
        <>
            <FAQWrapper onClick={props.onToggled}>
                <H5>{title}</H5>
                <PlusButton />
            </FAQWrapper>
            { props.open && renderContent() }
        </>
    )
}

export default FAQ;