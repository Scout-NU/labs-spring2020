import React from 'react';
import styled from '../../styles/theme/Theme';
import devices from '../../styles/variables/breakpoints';

const HeaderContent = styled.div`
    margin-right: 5%;
    @media ${devices.laptop} {
        margin: 0;
        padding: 10% 3.5em 0 3.5em;
    }

`

const HeaderContainer = styled.section`
    position: relative;
    background-color: #E6FCFF;
    /* border-radius: 0 0 0 50px; */
    margin-left: 10%;
    padding-top: 10%;

    @media ${devices.laptop} {
        margin: 0;
    }

    &::after {
        content: " ";
        position: absolute;
        display: block;
        background-color: inherit;
        height: 40vmin;
        width: 100%;
        clip-path: polygon(0 0, 100% 0%, 100% 100%, 0 0);
        z-index: -1;
        /* width: calc(100% - 50px);
         */
    }
` 

const PageHeader: React.FC = props => {
    return (
        <HeaderContainer>
            <HeaderContent>
                {props.children}
            </HeaderContent>
        </HeaderContainer>
    )
}

export default PageHeader;