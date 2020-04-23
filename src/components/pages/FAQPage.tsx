import React from 'react';
import { HeaderVariant, PageHeader, PageTitleGroup, PageSubheader, PageSection } from '../templates/Page';
import { H1, P } from '../atoms/Typography';
import { IFaq } from '../../types/client/model';
import FAQ from '../organisms/FAQ';
import styled from '../../styles/theme/Theme';

interface IFAQPageProps {
    faqs: IFaq[];
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
`

const DisconnectedFAQPage: React.FC<IFAQPageProps> = props => {
    const {faqs} = props;
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
                    <H1>Frequently Asked Questions</H1>
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
                {faqs.map((faq, i) => <FAQ faq={faq} key={i} open={toggledFaqs.includes(i)} onToggled={() => onFaqToggled(i)}/>)}
            </PageSection>
        </>
    )
}

export default DisconnectedFAQPage;