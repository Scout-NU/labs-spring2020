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
                    <Row center='xs'>
                        {props.results.map((value, i) => <PersonPreview onSelected={() => console.log(`Someone wants to meet ${value.name}`)} profile={value} key={i}/>)}
                    </Row>
                </Col>
            </Row>
        </HeaderSection>
    )
}

const SearchPage: React.FC = () => {
    const people: IPerson[] = [
        {   
            id: 'E700DD37-3BA0-4744-ABD9-39D797C2CF6D',
            name: 'Kate Jay',
            profileImageUrl: 'https://i.imgur.com/QyWwtjl.png',
            tags: ['Streets', 'Sidewalks', 'Recycling'],
            description: 'I like hot dogs!',
            department: {
                id: '4794AF0A-E41F-469B-ABDA-15D1C61451CF',
                title: 'Public Works',
                imageUrl: 'https://i.imgur.com/Tzvnqql.png',
                description: 'We ensure that Boston’s streets, sidewalks, and bridges are safe, clean, and attractive. We handle roadway construction and maintenance, recycling, waste removal, & more.'
            }
        }
    ]

    return(
        <DisconnectedSearchPage results={people}/>
    )
}


export default SearchPage;