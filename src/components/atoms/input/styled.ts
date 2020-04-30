
import styled from '../../../styles/theme/Theme';
import { lunchboxColors } from '../../../styles/theme/lunchbox';
import { InputFontProperties, P } from '../typography/Typography';
import { css } from 'styled-components';


const InputStyle = css`
    border: 3px solid blue;
    width: 100%;
    min-height: 3em;
    padding: 1em;
    font-family: 'montserrat';
    ${InputFontProperties};
    ${InputFontProperties};
`

export const StyledTextInput = styled.input`
    ${InputStyle};
`

export const StyledTextArea = styled.textarea`
    ${InputStyle};
    resize: vertical;
`

export const StyledCheckbox = styled.div`
    display: inline-flex;
    cursor: pointer;
    position: relative;

    & input {
        height: 24px;
        width: 24px;
        appearance: none;
        border: 2px solid ${lunchboxColors.gusher};
        border-radius: 3px;
        outline: none;
        transition: all .3s;
        background-color: white;
        cursor: pointer;
    }

    & input:checked {
        border: none;
        background-color: ${lunchboxColors.gusher};
    }
`

export const StyledLabel = styled(P)`
    font-weight: bolder;
` 
