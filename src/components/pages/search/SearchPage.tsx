import React from 'react';
import { H4, H2 } from '../../atoms/typography/Typography';
import NoSearchResults from '../../organisms/no-search-results-display/NoSearchResults';
import Spinner from '../../atoms/spinner/Spinner';
import SearchGroup from '../../../connectors/organisms/search-filter-group/ConnectedSearchGroup';
import { PageHeader, HeaderVariant, PageSection } from '../../templates/page/Page';
import { IPerson } from '../../../types/client/model/person';
import { ISearchContent } from '../../../types/client/page/search';
import AmbassadorPreviewGrid from '../../molecules/profile-grid/ProfileGrid';
import { HeaderCaption, SearchPageContent } from './styled';


interface ISearchPageProps {
    results: IPerson[];
    pageContent: ISearchContent;
    loading: boolean;
}

/**
 * Presentational search page.
 */
const DisconnectedSearchPage: React.FC<ISearchPageProps> = props => {
    const {pageContent, results, loading} = props;
    const renderSearchResults = () => {
        // No results and not loading means we didn't find anything
        if (!loading) {
            if (results.length === 0) {
                return (<NoSearchResults missingContentImageUrl={pageContent.noResultsImageUrl} header={pageContent.noResultsHeader} alternateOptions={pageContent.noResultsSuggestions} />)
            }
            return <AmbassadorPreviewGrid profiles={results}/>
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