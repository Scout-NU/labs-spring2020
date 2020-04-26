import React from 'react';
import { HeaderVariant, PageHeader, PageTitleGroup, PageSection } from '../templates/Page';
import { H1, P, H4, A } from '../atoms/Typography';
import FAQ from '../organisms/FAQ';
import styled from '../../styles/theme/Theme';
import { IFaqContent } from '../../types/client/page/faq';

interface IFAQPageProps {
    content: IFaqContent;
}

const FilterToggle = styled.button`
    border: none;
    background: none;
    transition: all .3s ease-in-out;

    &:hover {
        font-weight: bolder;
    }
`

const FilterToggles = styled.div`
    display: flex;
    justify-content: flex-start;
    text-align: center;
    margin-bottom: 2em;    
`

const FaqWrapper = styled.div`
    margin-bottom: 2em;    
`

const DisconnectedFAQPage: React.FC<IFAQPageProps> = props => {
    const { content } = props;
    const { faqs } = content;
    const [toggledFaqs, setToggled] = React.useState<number[]>([]);
    
    const onFaqToggled = (id: number) => {
        if (toggledFaqs.includes(id)) setToggled(toggledFaqs.filter(toggleId => toggleId !== id))
        else setToggled([...toggledFaqs, id])
    }

    const showAll = () => setToggled(faqs.map((f,i) => i));
    const hideAll = () => setToggled([]);

    return (
        <>
            <PageHeader headerVariant={HeaderVariant.FAQ}>
                <PageTitleGroup>
                    <H1>{content.pageHeader}</H1>
                </PageTitleGroup>
            </PageHeader>
            <PageSection>
                <FilterToggles>
                    <FilterToggle onClick={hideAll}> 
                        <P>Collapse all</P>
                    </FilterToggle>
                    <P>|</P>
                    <FilterToggle onClick={showAll}> 
                        <P>Expand all</P>
                    </FilterToggle>
                </FilterToggles>
                {faqs.map((faq, i) => {
                    return (
                        <FaqWrapper key={i}>
                            <FAQ faq={faq} open={toggledFaqs.includes(i)} onToggled={() => onFaqToggled(i)}/>
                        </FaqWrapper>
                    )
                })}
                <H4>{content.furtherQuestionHeader}</H4>
                <A href={`mailto:${content.furtherHelpEmail}`}>{content.furtherHelpHeader}</A>
            </PageSection>
        </>
    )
}

export default DisconnectedFAQPage;