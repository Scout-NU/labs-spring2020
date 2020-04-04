import React from 'react'
import vic from '../../images/home/vic-0.svg';

import { Row } from 'react-flexbox-grid';
import styled from '../../theme/Theme';
import { H2, H4, P } from '../atoms/Typography';

interface JourneyStepProps {
    title: string;
    text: string;
    imageName: string;
    textFirst: boolean; // show the image or the text first in the row
}

const JourneyBlurb = styled.div`
    width: 50%;
    text-align: left;
    margin-left: 2em;
`
const JourneyImage = styled.img`
    height: 30vw;
`

export const StepContainer = styled.div`
    margin: 3em 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex: 0 1 auto;
`

const JourneyStep: React.FC<JourneyStepProps> = (props) => {
    return (
        <StepContainer>
            <JourneyImage src={require('../../images/home/' + props.imageName + '.svg')}/>
            <JourneyBlurb>
                <H2>{props.title}</H2>
                <P>{props.text}</P>
            </JourneyBlurb>
        </StepContainer>
    )
}


export default JourneyStep;