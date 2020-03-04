import React from 'react';
import HeaderBlob from '../atoms/HeaderBlob';
import { lunchboxColors } from '../../theme/lunchbox';
import { H1, H4, H2 } from '../atoms/Typography';
import { Col, Row } from 'react-flexbox-grid';
import styled from '../../theme/Theme';
import devices from '../../styles/breakpoints';
import SearchBar from '../molecules/SearchBar';
import { IPerson } from '../../types/client';
import PersonPreview from '../molecules/PersonPreview';
import {tempPeople} from '../../tempPeople';

interface ISearchPageProps {
    results: IPerson[];
}

const HeaderSection = styled.section`
    text-align: left;
    margin-top: 8%;
`

const HeaderCaption = styled.div`
    position: relative;
    text-align: left;
    width: 60%;
    margin-top: 4em;

    @media ${devices.tablet} {
        left: auto;
        top: 10vh;
        width: 70%;
    }
`

const PersonWrapper = styled(Col)`
    margin-bottom: 3em;
`

const DisconnectedSearchPage: React.FC<ISearchPageProps> = props => {
    return (
        <HeaderSection>
            <HeaderBlob/>
            <Row center='xs'>
                <Col xs={9}>
                    <SearchBar/>
                    <Row end='xs'>
                        <HeaderCaption>
                            <H2>Connect with City Hall</H2>
                            <H4>Different Boston City Hall departments help the City of Boston in different ways. Find the person in a department that can best answer your questions!</H4>
                        </HeaderCaption>
                    </Row>
                </Col>
                <Col xs={9}>
                    <Row middle='xs' start='xs'>
                        { props.results.map((value, i) => {
                            return (
                                <PersonWrapper xs={12} sm={4}>
                                    <PersonPreview onSelected={() => console.log(`Someone wants to meet ${value.name}`)} profile={value} key={i}/>
                                </PersonWrapper>
                            )
                        })}
                    </Row>
                </Col>
            </Row>
        </HeaderSection>
    )
}

const SearchPage: React.FC = () => {
    const people: IPerson[] = tempPeople;

    return(
        <DisconnectedSearchPage results={people}/>
    )
}


export default SearchPage;