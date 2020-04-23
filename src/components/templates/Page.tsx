import React from 'react';
import { H3, H5 } from '../atoms/Typography';
import styled from '../../styles/theme/Theme';
import devices from '../../styles/variables/breakpoints';
import { lunchboxColors } from '../../styles/theme/lunchbox';

interface IHeaderProps {
    headerVariant: HeaderVariant;
}

const HeaderContent = styled.div<IHeaderProps>`
    background-color: ${props => mapVariantToColor(props.headerVariant)};
    padding: 10% 5% 0;

    @media ${devices.laptop} {
        margin: 0;
        padding: 10% 3.5em 0 3.5em;
    }
`

export const HeaderContainer = styled.section`
    margin-left: 5%;
    position: relative;
    
    @media ${devices.laptop} {
        margin: 0;
    }
` 

const HeaderBlob = styled.svg<IHeaderProps>`
    position: relative;
    width: 100%;
    fill: ${props => mapVariantToColor(props.headerVariant)};
`

// These represent different colors that the header shape could be.
export enum HeaderVariant {
    HOME,
    SEARCH,
    PROFILE,
    COMMUNICATION,
    FAQ
}

// Maps a Page to a Header color
const mapVariantToColor = (variant: HeaderVariant): string => {
    switch(variant) {
        case HeaderVariant.HOME:
            return lunchboxColors.tangerine;
        case HeaderVariant.SEARCH:
            return lunchboxColors.poptart;
        case HeaderVariant.PROFILE:
            return lunchboxColors.icepack;
        case HeaderVariant.COMMUNICATION:
            return lunchboxColors.salad;
        default:
            return lunchboxColors.egg;
    }
}

export const PageHeader: React.FC<IHeaderProps> = props => {
    const { headerVariant } = props;

    return (
        <HeaderContainer>
            <HeaderContent headerVariant={headerVariant}>
                {props.children}
            </HeaderContent>
            <HeaderBlob headerVariant={headerVariant} version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 1369 321.5">
                <g> <path d="M88.3,146.5C170.1,175.6,962,272.5,1369,321V0H0C0.5,66,10.8,118.9,88.3,146.5z" id="blob"/> </g>
            </HeaderBlob>
        </HeaderContainer>
    )
}

interface IPageSectionProps {
    title?: string;
}

export const StyledPageSection = styled.section`
    margin-bottom: 6em;
    display: flex;
    flex-direction: column;
    padding: 0 10%;
`

export const PageSection: React.FC<IPageSectionProps> = props => {
    return (
        <StyledPageSection>
            {props.title && <H3>{props.title}</H3>}
            {props.children}
        </StyledPageSection>
    )
}

export const PageTitleGroup = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 6em;
`

export const PageSubheader = styled(H5)`
    font-weight: normal;
    margin-top: 2em;
`