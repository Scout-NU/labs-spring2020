import React from 'react';
import HeaderBlob from '../atoms/HeaderBlob';
import { H4, H2 } from '../atoms/Typography';
import { Col, Row } from 'react-flexbox-grid';
import styled from '../../styles/theme/Theme';
import devices from '../../styles/variables/breakpoints';
import { IPerson } from '../../types/client/model';
import PersonPreview from '../molecules/PersonPreview';
import NoSearchResults from '../molecules/NoSearchResults';
import { ISearchPageContent } from '../../types/client/page';
import Spinner from '../atoms/Spinner';
import SearchGroup from '../../connectors/organisms/ConnectedSearchGroup';

interface ISearchPageProps {
    results: IPerson[];
    pageContent: ISearchPageContent;
    loading: boolean;
}

const SearchContainer = styled.section`
    text-align: left;
    margin-top: 15vh;
`

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

const PersonWrapper = styled(Col)`
    padding: 2em;
`

const HeaderContainer = styled(Col)`
    margin-bottom: 5vh;
`

const DisconnectedSearchPage: React.FC<ISearchPageProps> = props => {
    const {pageContent, results, loading} = props;
    const renderSearchResults = () => {
        if (!loading) {
            if (results.length === 0) {
                return (<NoSearchResults header={pageContent.noSearchResultsHeader} alternateOptions={pageContent.noSearchResultsAlternateOptions} />)
            }
            return results.map((value, i) => {
                return (
                    <PersonWrapper key={i} xs={11} md={6} lg={4}>
                        <PersonPreview onSelected={() => console.log(`Someone wants to meet ${value.firstName}`)} profile={value} key={i}/>
                    </PersonWrapper>
                )
            })
        }
        return (<Spinner/>)
    }
    return (
        <>
        <SearchContainer>
            <HeaderBlob/>
            <Row center='xs' middle='xs'>
                <HeaderContainer xs={10}>
                    <Row end='xs'>
                        <HeaderCaption>
                            <H2>{pageContent.pageHeader}</H2>
                            <H4>{pageContent.pageDescription}</H4>
                        </HeaderCaption>
                    </Row>
                    <SearchGroup />
                </HeaderContainer>
                <Col xs={10}>
                    <Row top='xs' center='xs'>
                        { renderSearchResults() }
                    </Row>
                </Col>
            </Row>
        </SearchContainer>
        </>
    )
}

export default DisconnectedSearchPage;