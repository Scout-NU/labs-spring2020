import React from 'react';
import { IPerson } from '../../types/client';
import { Row, Col } from 'react-flexbox-grid';
import CircleImage from '../atoms/CircleImage';
import { H5, P } from '../atoms/Typography';
import styled from '../../theme/Theme';
import Tag, {StyledTag} from '../atoms/Tag';
import Button, { ButtonStyle } from '../atoms/Button';
import Card from '../atoms/Card';

interface IPersonPreviewProps {
    profile: IPerson;
    onSelected: () => void;
}

const JobTitle = styled(P)`
    font-style: italic;
`

const Tags = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 1.5em;

    & ${StyledTag} {
        margin-bottom: .7em;
    }

    & ${StyledTag}:not(:last-child) {
        margin-right: .5em;
    }
`

const DepartmentImage = styled(CircleImage)`
    position: absolute;
    right: 0;
    bottom: 0;
`

// TODO: Can probably improve the way these are sized.
const ProfileImageContainer = styled.div`
    margin-bottom: 1em;
    position: relative;
    width: 250px; 
`

const PersonPreview: React.FC<IPersonPreviewProps> = props => {
    let info = props.profile;
    
    return (
        <Card>
            <Row start='xs'>
                <Col xs>
                    <ProfileImageContainer>
                        <CircleImage imageUrl={info.profileImageUrl} size='225px' />
                        <DepartmentImage imageUrl={info.department.imageUrl} size='90px'/>
                    </ProfileImageContainer>
                    <H5>{info.name}</H5>
                    <JobTitle>{info.department.title}</JobTitle>
                    <P>{info.department.description}</P>
                    <Tags>
                        {info.tags.map((value, i) => <Tag text={value} key={i}/>)}
                    </Tags>
                    <Button buttonStyle={ButtonStyle.PRIMARY} onClick={() => props.onSelected()}> Learn more </Button>
                </Col>
            </Row>
        </Card>
    )
}

export default PersonPreview;