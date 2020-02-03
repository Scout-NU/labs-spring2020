import styled from '../../theme/Theme';

export const P = styled.p`
    font-family: ${ props => props.theme.typography.fontFamily };
    font-size: ${ props => props.theme.typography.p.fontSize };
    line-height: ${ props => props.theme.typography.p.lineHeight };

`

export const H1 = styled.h1`
    font-family: ${ props => props.theme.typography.fontFamily };
    font-weight: ${ props => props.theme.typography.h1.fontWeight };
    font-size: ${ props => props.theme.typography.h1.fontSize };
    margin: 0;
`

export const H2 = styled.h2`
    font-family: ${ props => props.theme.typography.fontFamily };
    font-weight: ${ props => props.theme.typography.h2.fontWeight };
    font-size: ${ props => props.theme.typography.h2.fontSize };
    margin: 0;
`

export const H3 = styled.h3`
    font-family: ${ props => props.theme.typography.fontFamily };
    font-weight: ${ props => props.theme.typography.h3.fontWeight };
    font-size: ${ props => props.theme.typography.h3.fontSize };
    margin: 0;
`

export const H4 = styled.h4`
    font-family: ${ props => props.theme.typography.fontFamily };
    font-weight: ${ props => props.theme.typography.h4.fontWeight };
    font-size: ${ props => props.theme.typography.h4.fontSize };
    margin: 0;
`

export const H5 = styled.h5`
    font-family: ${ props => props.theme.typography.fontFamily };
    font-weight: ${ props => props.theme.typography.h5.fontWeight };
    font-size: ${ props => props.theme.typography.h5.fontSize };
    margin: 0;
`