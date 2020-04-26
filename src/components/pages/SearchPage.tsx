import React from 'react';
import { H4, H2 } from '../atoms/Typography';
import styled from '../../styles/theme/Theme';
import devices from '../../styles/variables/breakpoints';
import NoSearchResults from '../molecules/NoSearchResults';
import Spinner from '../atoms/Spinner';
import SearchGroup from '../../connectors/organisms/ConnectedSearchGroup';
import ProfileGrid from '../organisms/ProfileGrid';
import { PageHeader, HeaderVariant, PageSection } from '../templates/Page';
import { IPerson } from '../../types/client/model/person';
import { ISearchContent } from '../../types/client/page/search';


interface ISearchPageProps {
    results: IPerson[];
    pageContent: ISearchContent;
    loading: boolean;
}

const HeaderCaption = styled.div`
    position: relative;
    text-align: left;
    margin-top: 4em;

    @media ${devices.tablet} {
        left: auto;
        top: 0vh;
        width: 100%;
    }
`

const SearchPageContent = styled.div`
    margin-top: -24%;
    z-index: 1;
`

const DisconnectedSearchPage: React.FC<ISearchPageProps> = props => {
    const {pageContent, results, loading} = props;
    const renderSearchResults = () => {
        if (!loading) {
            if (results.length === 0) {
                return (<NoSearchResults header={pageContent.noResultsHeader} alternateOptions={pageContent.noResultsSuggestions} />)
            }
            return <ProfileGrid profiles={results}/>
        }
        return (<Spinner/>)
    }
    return (
        <div>
            <PageHeader headerVariant={HeaderVariant.SEARCH}>
                <HeaderCaption>
                    <H2>{pageContent.pageHeader}</H2>
                    <H4>{pageContent.pageSubheader}</H4>
                </HeaderCaption>
                <SearchGroup />
            </PageHeader>
            <PageSection>
                <SearchPageContent>
                    { renderSearchResults() }
                </SearchPageContent>
            </PageSection>
        </div>
    )
}

export default DisconnectedSearchPage;