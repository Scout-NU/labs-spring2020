import React from 'react';
import { H5, P } from '../atoms/Typography';
import styled from '../../styles/theme/Theme';
import Card from '../atoms/Card';
import TagGroup from '../molecules/TagGroup';
import { profileRoute } from '../../var/routes';
import PersonProfileImageGroup from './PersonProfileImageGroup';
import { IPerson } from '../../types/client/model/person';
import ContactListToggle from '../atoms/ContactListToggle';


interface IPersonPreviewProps {
    profile: IPerson;
}

const JobTitle = styled(P)`
    font-style: italic;
`

const PreviewCard = styled(Card)`
    display: flex;
    flex-direction: column;
    overflow: hidden;
    height: 70vh;
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

const ToggleWrapper = styled.div`
    position: relative;
    left: 43%;
    top: -3%;
`

const PersonPreview: React.FC<IPersonPreviewProps> = props => {
    const [showProfile, setShowProfile] = React.useState(false);
    const { profile } = props;

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
    }
    
    return (
        <PreviewCard>
            <ToggleWrapper>
                <ContactListToggle person={profile}/>
            </ToggleWrapper>
            <div onClick={onClick}>
                <PersonProfileImageGroup profileImageUrl={profile.profileImageUrl} departmentImageUrl={profile.department?.departmentImage}/>
                <H5>{`${profile.firstName} ${profile.lastName}`}</H5>
                <JobTitle>{profile.positionTitle}</JobTitle>
                <P>{shorten(profile.description, 100)}</P>
                <CardRule/>
                <TagWrapper>
                    <TagGroup tags={profile.tags.sort((a, b) => a.length - b.length)}/>
                </TagWrapper>
            </div>
        </PreviewCard>
    )
}



export default PersonPreview;