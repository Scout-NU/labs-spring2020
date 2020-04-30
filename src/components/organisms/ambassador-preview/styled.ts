import styled from '../../../styles/theme/Theme';
import Card from '../../atoms/card/Card';
import { P } from '../../atoms/typography/Typography';

export const JobTitle = styled(P)`
    font-style: italic;
`

export const PreviewCard = styled(Card)`
    display: flex;
    flex-direction: column;
    overflow: hidden;
    height: 70vh;
    padding: 2.5em 2em 1em 2em;
    transition: all .2s ease-in-out;

    &:hover {
        transform: scale(1.05);
    }
`

export const CardRule = styled.hr`
    border-top: .5px solid lightgray;
`

export const TagWrapper = styled.div`
    margin: 1.5em 0;
`

export const ToggleWrapper = styled.div`
    position: relative;
    left: 43%;
    top: -3%;
`

export const CardContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
