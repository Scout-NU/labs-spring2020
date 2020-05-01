
import styled from '../../../styles/theme/Theme';
import { P } from '../../atoms/typography/Typography';
import { Row } from 'react-flexbox-grid';
import { StyledFilterPopup } from '../../molecules/filter-popup/styled';
import { StyledButton } from '../../atoms/button/styled';

export const FilterOption = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

export const CheckLabel = styled(P)`
    display: inline-block;
    margin-left: .5em;
`

export const FilterWrapper = styled(Row)`
    margin-top: 1em;
    flex-wrap: wrap;
    
    & > ${StyledFilterPopup} {
        margin-right: 1em;
    }
`

export const ClearButton = styled(StyledButton)`
    background-color: transparent;
`