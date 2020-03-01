import React from 'react';
import HeaderBlob from '../atoms/HeaderBlob';
import { lunchboxColors } from '../../theme/lunchbox';
import { H1, H4, H2 } from '../atoms/Typography';
import { Col, Row } from 'react-flexbox-grid';
import styled from '../../theme/Theme';
import devices from '../../styles/breakpoints';
import SearchBar from '../molecules/SearchBar';


interface ISearchPageProps {

}

const HeaderSection = styled.section`
    text-align: left;
`

const HeaderCaption = styled.div`
    position: absolute;
    left: 40%;
    top: 25%;
    
    text-align: left;
    width: 40%;

    @media ${devices.tablet} {
        left: auto;
        top: 10vh;
        width: 70%;
    }
`

const SearchPage: React.FC<ISearchPageProps> = props => {
    return (
        <HeaderSection>
            <Col xs>
                <Row end='md'>
                    <HeaderBlob/>
                    <Col xs={10}>
                        <SearchBar/>
                    </Col>
                    <HeaderCaption>
                        <H2>Conect with City Hall</H2>
                        <H4>Different Boston City Hall departments help the City of Boston in different ways. Find the person in a department that can best answer your questions!</H4>
                    </HeaderCaption>
                </Row>
            </Col>
        </HeaderSection>
    )
}

export default SearchPage;