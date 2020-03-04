import React from 'react';
import { IPerson } from '../../types/client';
import { Row, Col } from 'react-flexbox-grid';
import CircleImage from '../atoms/CircleImage';
import { H5, P } from '../atoms/Typography';
import styled from '../../theme/Theme';
import Tag, {StyledTag} from '../atoms/Tag';
import Button, { ButtonStyle } from '../atoms/Button';

interface IPersonPreviewProps {
    profile: IPerson;
    onSelected: () => void;
}

const JobTitle = styled(P)`
    font-style: italic;
`

const Tags = styled(Row)`
    margin: 2em 0;
    & ${StyledTag}:not(:last-child) {
        margin-right: .5em;
    }
`

const DepartmentImage = styled(CircleImage)`
    position: relative;
    right: 70px;
`

const ProfileImageContainer = styled.div`
    margin-bottom: 1em;
`

const PersonPreview: React.FC<IPersonPreviewProps> = props => {
    let info = props.profile;
    
    return (
        <Row start='xs'>
            <Col>
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
    )
}

export default PersonPreview;