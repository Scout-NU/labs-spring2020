import styled from '../../theme/Theme';

export const P = styled.p`
    font-size: ${ props => props.theme.typography.p.fontSize };
    line-height: ${ props => props.theme.typography.p.lineHeight };;
`

export const H1 = styled.h1`
    font-weight: ${ props => props.theme.typography.h1.fontWeight };
    font-size: ${ props => props.theme.typography.h1.fontSize };
`

export const H2 = styled.h2`
    font-weight: ${ props => props.theme.typography.h2.fontWeight };
    font-size: ${ props => props.theme.typography.h2.fontSize };
`

export const H3 = styled.h3`
    font-weight: ${ props => props.theme.typography.h3.fontWeight };
    font-size: ${ props => props.theme.typography.h3.fontSize };
`

export const H4 = styled.h4`
    font-weight: ${ props => props.theme.typography.h4.fontWeight };
    font-size: ${ props => props.theme.typography.h4.fontSize };
`