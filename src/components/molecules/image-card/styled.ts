import styled from '../../../styles/theme/Theme';
import Card from '../../atoms/card/Card';

export const CardImage = styled.img`
    width: 100%;
    border-radius: inherit;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
`

export const CardWrapper = styled(Card)`
    padding: 0;
    text-align: left;
`

export const CardBody = styled.div`
    padding: 3em;
`