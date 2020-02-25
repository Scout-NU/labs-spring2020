import styled from '../../theme/Theme';
import { breakPoints } from '../../styles/breakpoints';

export const P = styled.p`
    font-family: ${ props => props.theme.typography.fontFamily };
    font-size: ${ props => scaleFont(props.theme.typography.p) };
    line-height: ${ props => scaleFont({ fontMax: props.theme.typography.p.lineHeightMax, fontMin: props.theme.typography.p.lineHeightMin })};

`

export const H1 = styled.h1`
    font-family: ${ props => props.theme.typography.fontFamily };
    font-weight: ${ props => props.theme.typography.h1.fontWeight };
    font-size: ${ props => scaleFont(props.theme.typography.h1) };
    margin: 0;
`

export const H2 = styled.h2`
    font-family: ${ props => props.theme.typography.fontFamily };
    font-weight: ${ props => props.theme.typography.h2.fontWeight };
    font-size: ${ props => scaleFont(props.theme.typography.h2) };
    margin: 0;
`

export const H3 = styled.h3`
    font-family: ${ props => props.theme.typography.fontFamily };
    font-weight: ${ props => props.theme.typography.h3.fontWeight };
    font-size: ${ props => scaleFont(props.theme.typography.h3) };
    margin: 0;
`

export const H4 = styled.h4`
    font-family: ${ props => props.theme.typography.fontFamily };
    font-weight: ${ props => props.theme.typography.h4.fontWeight };
    font-size: ${ props => scaleFont(props.theme.typography.h4) };
    margin: 0;
`

export const H5 = styled.h5`
    font-family: ${ props => props.theme.typography.fontFamily };
    font-weight: ${ props => props.theme.typography.h5.fontWeight };
    font-size: ${ props => scaleFont(props.theme.typography.h5) };
    margin: 0;
`

export const NavigationLink = styled.a`
    font-family: ${ props => props.theme.typography.fontFamily };
    font-weight: ${ props => props.theme.typography.navLink.fontWeight };
    font-size: ${ props => scaleFont(props.theme.typography.navLink) };
    transition: all .3s ease-in-out;

    &:hover {
        text-decoration: underline;
    }
`

interface TypeSpec {
    fontMax: string;
    fontMin: string;
}

// Src: https://css-tricks.com/books/fundamental-css-tactics/scale-typography-screen-size/
export const scaleFont = (type: TypeSpec): string => {
    return `calc(${type.fontMin} + (${stripLetters(type.fontMax)} - ${stripLetters(type.fontMin)}) * ((100vw - ${breakPoints.mobileS}) / (${stripLetters(breakPoints.desktop)} - ${stripLetters(breakPoints.mobileS)})));`
} 

const stripLetters = (string: string): string => {
    return Array.from(string).filter((value) => !isNaN(parseInt(value))).join('');
}