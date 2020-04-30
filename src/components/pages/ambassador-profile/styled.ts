import styled from '../../../styles/theme/Theme';
import devices from '../../../styles/variables/breakpoints';
import Card from '../../atoms/card/Card';
import { Col } from 'react-flexbox-grid';
import { H1, P, H5, H4, A } from '../../atoms/typography/Typography';
import { StyledPageSection } from '../../templates/page/styled';
import { StyledButton } from '../../atoms/button/styled';

export const AboutMeCard = styled(Card)`
    margin-top: 3em;
    padding: 5em;
    text-align: left;
    margin-top: -20%;
    z-index: 1;

    @media ${devices.laptop} {
        padding: 3em;
    }
`

export const ProfileInformationWrapper = styled.div`
    text-align: left;

    & p {
        display: inline-block;
    }
`

export const ProfileActionsWrapper = styled(Col)`
    & * {
        margin-bottom: 2em;
    }

    & button {
        margin-left: 1em;
    }
`

export const GreetingText = styled(H1)`
    font-weight: normal;
`

export const ProfileSubheader = styled(P)`
    font-weight: bolder;
    text-transform: uppercase;
    margin: 0;
`

export const PositionTitleText= styled(H5)`
    font-weight: normal;
`

export const PriorityStatement = styled(H4)`
    font-style: italic;
    font-weight: normal;
    margin: 1.5em 0 2em 1em;
`

export const DepartmentLink = styled(A)`
    margin-top: 2em;
    font-weight: normal;
`

export const ProjectSection = styled(StyledPageSection)`
    display: flex;
    flex-direction: column;
    align-items: center;
    & ${StyledButton} {
        margin-top: 2em;
    }
`
