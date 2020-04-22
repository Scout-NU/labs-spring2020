import React from 'react';
import styled from '../../styles/theme/Theme';
import devices from '../../styles/variables/breakpoints';
import { lunchboxColors } from '../../styles/theme/lunchbox';

interface IHeaderProps {
    headerVariant: HeaderVariant;
}

const HeaderContent = styled.div<IHeaderProps>`
    background-color: ${props => mapVariantToColor(props.headerVariant)};
    padding-top: 10%;
    padding-right: 5%;

    @media ${devices.laptop} {
        margin: 0;
        padding: 10% 3.5em 0 3.5em;
    }
`

export const HeaderContainer = styled.section`
    margin-left: 10%;
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
    FIRST,
    SECOND,
    THIRD,
    FOURTH,
    FIFTH
}

const mapVariantToColor = (variant: HeaderVariant): string => {
    switch(variant) {
        case HeaderVariant.FIRST:
            return lunchboxColors.tangerine;
        case HeaderVariant.SECOND:
            return lunchboxColors.poptart;
        case HeaderVariant.THIRD:
            return lunchboxColors.icepack;
        case HeaderVariant.FOURTH:
            return lunchboxColors.salad;
        default:
            return lunchboxColors.egg;
    }
}

const PageHeader: React.FC<IHeaderProps> = props => {
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

export default PageHeader;