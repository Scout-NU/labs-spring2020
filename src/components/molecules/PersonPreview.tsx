import React from 'react';
import { IPerson } from '../../types/client/model';
import { Row, Col } from 'react-flexbox-grid';
import CircleImage, { CircleImageSize } from '../atoms/CircleImage';
import { H5, P } from '../atoms/Typography';
import styled from '../../styles/theme/Theme';
import Card from '../atoms/Card';
import TagGroup from '../molecules/TagGroup';
import { Redirect } from 'react-router';
import { profileRoute } from '../../var/routes';
import PersonProfileImageGroup from './PersonProfileImageGroup';


interface IPersonPreviewProps {
    profile: IPerson;
}

const JobTitle = styled(P)`
    font-style: italic;
`

const PreviewCard = styled(Card)`
    height: 70vh;
    overflow: hidden;
    padding: 2.5em 2em 1em 2em;
    transition: all .2s ease-in-out;

    &:hover {
        transform: scale(1.05);
    }
`

const CardRule = styled.hr`
    border-top: .5px solid lightgray;
`

const TagWrapper = styled.div`
    margin: 1.5em 0;
`

const Fade = styled.div`
    position: relative;
    bottom: 0;
    height: 10%;
    width: 100%;
    background: linear-gradient(to bottom, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 100%);
`

const PersonPreview: React.FC<IPersonPreviewProps> = props => {
    const [showProfile, setShowProfile] = React.useState(false);

    let info = props.profile;
    const cardHeight = 635;

    const shorten = (text: string, maxChars: number): string => {
        // src: stackoverflow.com/questions/5454235/shorten-string-without-cutting-words-in-javascript
        if (text.length <= maxChars) return text;
        return `${text.substr(0, text.lastIndexOf(' ', maxChars))}...`;
    }

    // TODO: Pull this out? Unsure
    const onClick = () => {
        setShowProfile(true);
    }

    if (showProfile) {
        window.location.assign(`${profileRoute}/${props.profile.id}`)
        // return (<Redirect to={`${profileRoute}/${props.profile.id}`}/>)
    }
    
    return (
        <PreviewCard onClick={onClick}>
            <Row center='xs'>
                <Col xs>
                    <PersonProfileImageGroup profileImageUrl={info.profileImageUrl} departmentImageUrl={info.department?.departmentImage} size={CircleImageSize.MEDIUM}/>
                    <H5>{`${info.firstName} ${info.lastName}`}</H5>
                    <JobTitle>{info.positionTitle}</JobTitle>
                    <P>{shorten(info.description, 100)}</P>
                    <CardRule/>
                    <TagWrapper>
                        <TagGroup tags={info.tags.sort((a, b) => a.length - b.length)}/>
                    </TagWrapper>

                </Col>
            </Row>
            <Fade/>

        </PreviewCard>
    )
}



export default PersonPreview;