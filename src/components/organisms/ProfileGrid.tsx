import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import PersonPreview from '../molecules/PersonPreview';
import styled from '../../styles/theme/Theme';
import { IPerson } from '../../types/client/model/person';


interface IProfileGridProps {
    profiles: IPerson[];
}

const PersonWrapper = styled(Col)`
    padding: 2em;
`

const ProfileGrid: React.FC<IProfileGridProps> = props => {
    return (
        <Row top='xs' center='xs'>
            {props.profiles.map((value, i) => {
                return (
                    <PersonWrapper key={i} xs={11} md={6} lg={4}>
                        <PersonPreview profile={value} key={i}/>
                    </PersonWrapper>
                )
            })}
        </Row>
    )
}

export default ProfileGrid;