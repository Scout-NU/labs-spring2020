import React from 'react';
import { H5, P, A } from '../../atoms/typography/Typography';
import { IFaq } from '../../../types/client/page/faq';
import TextList from '../../atoms/ul/List';
import { LinkWrapper, FAQLink, FAQContent, FAQWrapper, PlusButton } from './styled';


interface IFAQProps {
    faq: IFaq;
    open: boolean;
    onToggled: () => void;
}


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