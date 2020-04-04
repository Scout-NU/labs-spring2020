import React from 'react';
import { IPerson } from '../../types/client/client';
import { Row, Col } from 'react-flexbox-grid';
import CircleImage from '../atoms/CircleImage';
import { H5, P } from '../atoms/Typography';
import styled from '../../theme/Theme';
import Button, { ButtonStyle } from '../atoms/Button';
import Card from '../atoms/Card';
import TagGroup from '../molecules/TagGroup';
import Tag from '../atoms/Tag';
import { lunchboxColors } from '../../theme/lunchbox';


interface IPersonPreviewProps {
    profile: IPerson;
    onSelected: () => void;
}

const JobTitle = styled(P)`
    font-style: italic;
`

interface IPreviewCardProps {
    maxHeight: number;
}

const PreviewCard = styled(Card)<IPreviewCardProps>`
    /* height: ${props => props.maxHeight ? `${props.maxHeight}px` : '635px'}; */
    height: 80vh;
    overflow: hidden;
    padding: 2.5em 2em 1em 2em;
    transition: all .2s ease-in-out;

    &:hover {
        transform: scale(1.05);
    }
`

const DepartmentImage = styled(CircleImage)`
    position: absolute;
    background-color: white;
    border: 1px solid black;
    right: 20%;
    bottom: 0;
`

// TODO: Can probably improve the way these are sized.
const ProfileImageContainer = styled.div`
    margin-bottom: 1em;
    position: relative;
    /* width: 250px;  */
`

const CardRule = styled.hr`
    border-top: .5px solid lightgray;
`

const TagWrapper = styled.div`
    margin: 1.5em 0;
`

const PersonPreview: React.FC<IPersonPreviewProps> = props => {
    let info = props.profile;
    const cardHeight = 635;

    const shorten = (text: string, maxChars: number): string => {
        // src: stackoverflow.com/questions/5454235/shorten-string-without-cutting-words-in-javascript
        if (text.length <= maxChars) return text;
        return `${text.substr(0, text.lastIndexOf(' ', maxChars))}...`;
    }
    
    return (
        <PreviewCard maxHeight={635}>
            <Row center='xs'>
                <Col xs>
                    <ProfileImageContainer>
                        <CircleImage imageUrl={info.profileImageUrl} size={`${Math.round(.25 * cardHeight)}`} />
                        <DepartmentImage imageUrl={`//images.ctfassets.net/silnjjl59l7l/518KgfzCDMu8mnn3aMXk1V/9de3a4b78f513656115b70c16d269ca8/newurbanmechanics.svg?h=252`} size='60'/>
                    </ProfileImageContainer>
                    <H5>{`${info.firstName} ${info.lastName}`}</H5>
                    <JobTitle>{info.positionTitle}</JobTitle>
                    <P>{shorten(info.description, 100)}</P>
                    <CardRule/>
                    <TagWrapper>
                        <TagGroup tags={info.tags.sort((a, b) => a.length - b.length)}/>
                    </TagWrapper>
                </Col>
            </Row>
        </PreviewCard>
    )
}



export default PersonPreview;