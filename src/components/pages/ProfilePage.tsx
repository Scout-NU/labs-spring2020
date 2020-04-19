import React from 'react';
import { IProfile } from '../../types/client/model';
import HeaderBlob from '../atoms/HeaderBlob';
import styled from '../../styles/theme/Theme';
import { Row, Col } from 'react-flexbox-grid';
import CircleImage from '../atoms/CircleImage';
import Button, { ButtonStyle } from '../atoms/Button';
import { H1, P, H3, H4, H5, A } from '../atoms/Typography';
import TagGroup from '../molecules/TagGroup';
import PersonPreview from '../molecules/PersonPreview';
import { Ul, Li } from '../atoms/List';
import Card from '../atoms/Card';


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
const AboutMeCard = styled(Card)`
    padding: 5em;
    text-align: left;
`

const RelatedPeopleSecton = styled.div`
    margin-bottom: 4em;
`

const ProfileInformationWrapper = styled.div`
    text-align: left;

    & p {
        display: inline-block;
    }
`

const ProfileActionsWrapper = styled(Col)`
    & * {
        margin-bottom: 2em;
    }
`

const GreetingText = styled(H1)`
    font-weight: normal;
`

const ProfileSubheader = styled(P)`
    font-weight: bolder;
    text-transform: uppercase;
    margin: 0;
`

const KnowledgeableTopics = styled(Ul)`
    margin-top: 0;
`

const PositionTitleText= styled(H5)`
    font-weight: normal;
`

const PriorityStatement = styled(H4)`
    font-style: italic;
    font-weight: normal;
    margin: 1.5em 0 2em 1em;
`

const DepartmentLink = styled(A)`
    margin-top: 2em;
    font-weight: normal;
`

const DisconnectedProfilePage: React.FC<IProfilePageProps> = props => {
    const info = props.info;
    console.log(info.department)
    
    return (
        <>
            <HeaderSection>
                <HeaderBlob/>
                <Row end="xs">
                    <Col xs={12} sm={11}>
                        <Row center="xs" start="xs">
                            <ProfileActionsWrapper xs={12} sm={4}>
                                <CircleImage imageUrl={info.profileImageUrl} size='300'/>
                                <Button buttonStyle={ButtonStyle.PRIMARY} onClick={() => window.alert('No emailing yet!')}>Email me</Button>
                            </ProfileActionsWrapper>

                            <Col xs={12} sm={6}>
                                <ProfileInformationWrapper>
                                    <GreetingText>Hello, my name is</GreetingText>
                                    <H1>{`${info.firstName} ${info.lastName}`} <P>(She/Her)</P></H1>                             
                                    <PositionTitleText>{info.positionTitle}, {info.department?.departmentName}</PositionTitleText>
                                    <PriorityStatement>"{info.priorityStatement}"</PriorityStatement>
                                    <ProfileSubheader>Ask me about:</ProfileSubheader>
                                    <KnowledgeableTopics>
                                        {info.knowledgeableTopics.map((value, i) => <Li key={i}><P>{value}</P></Li>)}
                                    </KnowledgeableTopics>
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
                        <AboutMeCard>
                            <ProfileSubheader>About Me</ProfileSubheader>
                            <P>{info.description}</P>
                            <DepartmentLink href={info.department?.departmentUrl} target="_blank">
                                <P>Learn more at the {info.department?.departmentName}</P>
                            </DepartmentLink>
                        </AboutMeCard>
                    </Col>
                </Row>
            </DepartmentSection>
            
            { info.relatedPeople.length !== 0 && 
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

export default DisconnectedProfilePage;