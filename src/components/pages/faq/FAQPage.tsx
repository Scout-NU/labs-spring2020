import React from 'react';
import { H1, P, H4, A } from '../../atoms/typography/Typography';
import FAQ from '../../organisms/faq/FAQ';
import { IFaqContent } from '../../../types/client/page/faq';
import { PageHeader, HeaderVariant, PageSection } from '../../templates/page/Page';
import { PageTitleGroup } from '../../templates/page/styled';
import { FilterToggles, FilterToggle, FaqWrapper } from './styles';

interface IFAQPageProps {
    content: IFaqContent;
}

/**
 * Presentational FAQ Page, expects cms content.
 */
const DisconnectedFAQPage: React.FC<IFAQPageProps> = props => {
    const { content } = props;
    const { faqs } = content;
    // Track all FAQs rendered by an ID
    const [toggledFaqs, setToggled] = React.useState<number[]>([]);
    
    // Toggle an FAQ by either adding it or removing it from the list in state
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