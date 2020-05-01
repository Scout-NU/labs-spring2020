import styled from '../../../styles/theme/Theme';
import Card from '../../atoms/card/Card';
import { P } from '../../atoms/typography/Typography';

export const JobTitle = styled(P)`
    font-style: italic;
`

export const PreviewCard = styled(Card)`
    display: flex;
    position: relative;
    flex-direction: column;
    overflow: hidden;
    height: 70vh;
    padding: 2.5em 2em 1em 2em;
    transition: all .2s ease-in-out;

    & > ${P} {
        margin: 1em 0 0 0;
    }

    &:hover {
        transform: scale(1.05);
    }
`

export const Fade = styled.div`
    position: absolute;
    z-index: 9;
    bottom: 0;
    left: 0;
    pointer-events: none;
    background: rgb(255,255,255);
    background: linear-gradient(180deg, rgba(255,255,255,0.48363095238095233) 0%, rgba(255,255,255,1) 59%, rgba(255,255,255,1) 100%);    
    width: 122%;
    height: 4em;    
`

export const TagWrapper = styled.div`
    margin: 1.25em 0;
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
