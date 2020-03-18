import React from 'react';
import { IProfile, IPerson } from '../../types/client';
import HeaderBlob from '../atoms/HeaderBlob';
import styled from '../../theme/Theme';
import { Row, Col } from 'react-flexbox-grid';
import CircleImage from '../atoms/CircleImage';
import Button, { ButtonStyle } from '../atoms/Button';
import { H1, H4, P, H3, H5 } from '../atoms/Typography';
import {tempPeople} from '../../tempPeople';
import TagGroup from '../molecules/TagGroup';
import PersonPreview from '../molecules/PersonPreview';


interface IProfilePageProps {
    info: IProfile;
}

const HeaderSection = styled.div`
    margin: 10em 0 8em;
    text-align: left;
`

const DepartmentSection = styled.div`
    margin-bottom: 6em;
`

const RelatedPeopleSecton = styled.div`
    margin-bottom: 4em;
`

const ProfileInformationWrapper = styled.div`
    text-align: left;
`

const ProfileActionsWrapper = styled(Col)`
    & * {
        margin-bottom: 2em;
    }
`

const GreetingText = styled(H1)`
    font-weight: normal;
`

const AskMeText = styled(P)`
    font-weight: bolder;
    text-transform: uppercase;
`

const PriorityStatement = styled(P)`
    font-weight: bolder;
    font-style: italic;
`

const DepartmentResponsibilitiesWrapper = styled.div`
    border: 1px solid black;
    padding: 4em;
`

const DisconnectedProfilePage: React.FC<IProfilePageProps> = props => {
    const info = props.info;
    
    return (
        <>
            <HeaderSection>
                <HeaderBlob/>
                <Row end="xs">
                    <Col xs={12} sm={11}>
                        <Row center="xs" start="xs">
                            <ProfileActionsWrapper xs={12} sm={4}>
                                <CircleImage imageUrl={info.profileImageUrl} size='300px'/>
                                <Button buttonStyle={ButtonStyle.SECONDARY} onClick={() => window.alert('No help yet!')}> Three steps for a great email </Button>
                                <Button buttonStyle={ButtonStyle.PRIMARY} onClick={() => window.alert('No emailing yet!')}>Email me</Button>
                            </ProfileActionsWrapper>

                            <Col xs={12} sm={6}>
                                <ProfileInformationWrapper>
                                    <GreetingText>Hello, my name is</GreetingText>
                                    <H1>{info.name}</H1>
                                    <H4>{info.department.title}</H4>
                                    <PriorityStatement>{info.priorityStatement}</PriorityStatement>
                                    <P>{info.description}</P>
                                    <AskMeText>Ask me about:</AskMeText>
                                    <ul>
                                        {info.knowledgeableTopics.map((value, i) => <li key={i}><P>{value}</P></li>)}
                                    </ul>
                                </ProfileInformationWrapper>
                                <TagGroup tags={info.tags}/>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </HeaderSection>

            <DepartmentSection>
                <Row center="xs">
                    <Col xs={10}>
                        <DepartmentResponsibilitiesWrapper>
                            <Row start="xs">
                                <Col xs={12}>
                                    <H3>Here's what we do</H3>
                                </Col>
                                {info.department.responsibilities.map((value, i) => {
                                    return(
                                        <Col key={i} xs={4}>
                                            <H5>{value.title}</H5>
                                            <P>{value.description}</P>
                                        </Col>
                                    )
                                })}
                            </Row>
                        </DepartmentResponsibilitiesWrapper>
                    </Col>
                </Row>
            </DepartmentSection>
            
            { info.relatedPeople.length != 0 && 
                <RelatedPeopleSecton>
                    <Row center="xs">
                        <Col xs={10}>
                            <Row start="xs">
                                <Col xs={12}>
                                    <H3>Related people</H3>
                                </Col>
                                {info.relatedPeople.map((value, i) => {
                                    return(
                                        <Col key={i} xs={6}>
                                            <PersonPreview profile={value} onSelected={() => window.alert("doesnt go anywhere yet")}/>
                                        </Col>
                                    )
                                })}
                            </Row>
                        </Col>
                    </Row>
                </RelatedPeopleSecton>
            }
        </>
    )
}

const ProfilePage: React.FC = () => {
    const person: IPerson = tempPeople[0];
    const profile = {
            ...person,
            priorityStatement: 'I care about making walking safer and more enjoyable, and fixing the problems that frustrate our residents the most.',
            knowledgeableTopics: ['Paving sidewalks and streets', 'Keeping sidewalks clean', 'Adding and improving pedestrian crosswalks']
        }

    return (
        <DisconnectedProfilePage info={profile}/>
    )
}

export default ProfilePage;