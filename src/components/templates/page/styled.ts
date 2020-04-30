import styled from '../../../styles/theme/Theme';
import devices from '../../../styles/variables/breakpoints';
import { lunchboxColors } from '../../../styles/theme/lunchbox';
import { H5 } from '../../atoms/typography/Typography';
import { HeaderVariant, IHeaderProps } from './Page';


export const PageTitleGroup = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 6em;
`

export const PageSubheader = styled(H5)`
    font-weight: normal;
    margin-top: 2em;
    max-width: 90%;
    text-align: center;

    @media ${devices.laptop} {
        text-align: left;
        max-width: 100%;

    }
`

export const StyledPageSection = styled.section`
    margin-bottom: 6em;
    display: flex;
    flex-direction: column;
    padding: 0 10%;
`

// Maps a Page to a Header color
export const mapVariantToColor = (variant: HeaderVariant): string => {
    switch(variant) {
        case HeaderVariant.HOME:
            return lunchboxColors.tangerine;
        case HeaderVariant.SEARCH:
            return lunchboxColors.poptart;
        case HeaderVariant.PROFILE:
            return lunchboxColors.icepack;
        case HeaderVariant.CONVERSATION_GUIDE:
            return lunchboxColors.salad;
        default:
            return lunchboxColors.egg;
    }
}

export const HeaderContent = styled.div<IHeaderProps>`
    background-color: ${props => mapVariantToColor(props.headerVariant)};
    padding: 10% 5% 0;

    @media ${devices.laptop} {
        margin: 0;
        padding: 10% 3.5em 0 3.5em;
    }
`

export const StyledHeaderContainer = styled.section`
    margin-left: 5%;
    position: relative;
    
    @media ${devices.laptop} {
        margin: 0;
    }
` 

export const HeaderBlob = styled.svg<IHeaderProps>`
    position: relative;
    width: 100%;
    fill: ${props => mapVariantToColor(props.headerVariant)};
`