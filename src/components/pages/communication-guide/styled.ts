import styled from '../../../styles/theme/Theme';
import devices from '../../../styles/variables/breakpoints';
import { lunchboxColors } from '../../../styles/theme/lunchbox';
import { Ul } from '../../atoms/ul/styled';
import { H2 } from '../../atoms/typography/Typography';


export const HeaderPeople = styled.img`
    position: absolute;
    width: 25%;
    z-index: 0;
    right: 10%;
    bottom: -7.5%;
    z-index: 1;

    @media ${devices.tablet} {
        width: 35%;
    }
`

export const ClickIcon = styled.div`
    border-radius: 50%;
    background-color: ${lunchboxColors.salad};
    width: fit-content;
    height: fit-content;
    padding: 1.25em;
`

export const RemindersWrapper = styled.div`
    display: flex;
    padding: 5% 20%;

    & ${ClickIcon} {
        margin-right: 3em;
    }

    @media ${devices.tablet} {
        flex-direction: column;
        padding: 25% 8% 0;

        & ${ClickIcon} {
            margin-bottom: 2em;
        }
    }
`

export const StepWrapper = styled.div`
    margin-bottom: 2em;
    padding: 2em 6em;
    background-color: ${lunchboxColors.carton};

    & ${Ul} {
        margin-left: 4em;
    }

    & h2 {
        margin-bottom: .25em;
    }

    @media ${devices.tablet} {
        padding: 3em;

        & ${Ul} {
            margin-left: 0;
        }

        & h2 {
            margin-bottom: .25em;
        }
    }
`

export const StepTitle = styled.div`
    display: flex;
    align-content: flex-start;
`

export const StepNumber = styled(H2)`
    font-weight: normal;
    margin-right: 1em;
`
