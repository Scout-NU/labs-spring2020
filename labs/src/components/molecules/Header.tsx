import React from 'react';
import styled from '../../theme/Theme';
import { P } from '../atoms/Typography';
import { Row, Col } from 'react-flexbox-grid';
import devices from '../../styles/breakpoints';

interface IHeaderProps {

}

const HeaderContainer = styled.nav`
    position: fixed;
    top: 0;
    z-index: 999;
    width: 100%;

    @media ${devices.tablet} {
        display: none;
    }
`

const HeaderLink = styled.a`
    font-family: ${props => props.theme.typography.fontFamily};
    font-weight: bolder;
    font-size: 24px;
    text-transform: uppercase;
    /* margin-left: 3em; */
    margin: 2em 3em 2em 1em;

`

export const Header: React.FC<IHeaderProps> = props => {
    return (
        <HeaderContainer>
            <Col xs>
                <Row end='xs'>
                    <HeaderLink>Home</HeaderLink>
                    <HeaderLink>Connect With City Hall</HeaderLink>
                    <HeaderLink>Help</HeaderLink>
                </Row>
            </Col>
        </HeaderContainer>
    )
}