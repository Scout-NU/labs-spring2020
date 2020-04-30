import styled from '../../../styles/theme/Theme';
import { StyledTextInput } from '../../atoms/input/styled';
import { StyledButton } from '../../atoms/button/styled';
import { H5 } from '../../atoms/typography/Typography';


export const FormWrapper = styled.div`
    & ${StyledButton} {
        margin-top: 2em;
    }

    & ${StyledTextInput} {
        margin-bottom: 1em;
    }
`

export const FormDescription = styled(H5)`
    font-weight: normal;
`