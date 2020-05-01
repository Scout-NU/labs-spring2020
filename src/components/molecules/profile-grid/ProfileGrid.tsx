import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import AmbassadorPreview from '../../organisms/ambassador-preview/AmbassadorPreview';
import styled from '../../../styles/theme/Theme';
import { IPerson } from '../../../types/client/model/person';
import devices from '../../../styles/variables/breakpoints';


interface IAmbassadorPreviewGridProps {
    profiles: IPerson[];
}

const PersonWrapper = styled(Col)`
    padding: 1em;

    @media ${devices.tablet} {
        padding: 1em 0; 
    }
`

const AmbassadorPreviewGrid: React.FC<IAmbassadorPreviewGridProps> = props => {
    return (
        <Row top='xs' center='xs'>
            {props.profiles.map((value, i) => {
                return (
                    <PersonWrapper key={i} xs={11} md={6} lg={4}>
                        <AmbassadorPreview profile={value} key={i}/>
                    </PersonWrapper>
                )
            })}
        </Row>
    )
}

export default AmbassadorPreviewGrid;