import React from 'react';
import { H5, P } from '../../atoms/typography/Typography';
import TagGroup from '../../molecules/tag-group/TagGroup';
import { profileRoute } from '../../../var/routes';
import PersonProfileImageGroup from '../../molecules/profile-image-group/PersonProfileImageGroup';
import { IPerson } from '../../../types/client/model/person';
import ContactListToggle from '../../molecules/contact-toggle/ContactListToggle';
import { PreviewCard, ToggleWrapper, CardContent, JobTitle, TagWrapper, Fade } from './styled';


interface IAmbassadorPreviewProps {
    profile: IPerson;
}

const AmbassadorPreview: React.FC<IAmbassadorPreviewProps> = props => {
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
            <CardContent onClick={onClick}>
                <PersonProfileImageGroup profileImageUrl={profile.profileImageUrl} departmentImageUrl={profile.department?.departmentImage}/>
                <H5>{`${profile.firstName} ${profile.lastName}`}</H5>
                <JobTitle>{profile.positionTitle}</JobTitle>
                <P>{shorten(profile.description, 100)}</P>
                <TagWrapper>
                    <TagGroup tags={profile.tags.sort((a, b) => b.length - a.length)}/>
                </TagWrapper>
            </CardContent>
            <Fade/>
        </PreviewCard>
    )
}



export default AmbassadorPreview;