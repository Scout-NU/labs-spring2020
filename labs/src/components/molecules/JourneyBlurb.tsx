import React from 'react'
import vic from '../../images/home/vic-0.svg';

import { Row } from 'react-flexbox-grid';
import styled from '../../theme/Theme';
import { H2, H4 } from '../atoms/Typography';

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

const StepContainer = styled.div`
    margin: 3em 0;
`


const JourneyStep: React.FC<JourneyStepProps> = (props) => {
    return (
        <StepContainer>   
            <Row between='xs' middle='xs' reverse={props.textFirst}>
                <JourneyImage src={require('../../images/home/' + props.imageName + '.svg')}/>
                <JourneyBlurb>
                    <H2>{props.title}</H2>
                    <H4>{props.text}</H4>
                </JourneyBlurb>
            </Row>
        </StepContainer>
    )
}

export default JourneyStep;