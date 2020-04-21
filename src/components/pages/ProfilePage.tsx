import React from 'react';
import { IProfile } from '../../types/client/model';
import HeaderBlob from '../atoms/HeaderBlob';
import styled from '../../styles/theme/Theme';
import { Row, Col } from 'react-flexbox-grid';
import CircleImage from '../atoms/CircleImage';
import Button, { ButtonStyle, StyledButton } from '../atoms/Button';
import { H1, P, H4, H5, A } from '../atoms/Typography';
import TagGroup from '../molecules/TagGroup';
import { Ul, Li } from '../atoms/List';
import Card from '../atoms/Card';
import ProfileGrid from '../organisms/ProfileGrid';
import ProjectGrid from '../organisms/ProjectGrid';
import PageSection, { StyledPageSection } from '../molecules/PageSection';
import PageHeader from '../molecules/PageHeader';
import devices from '../../styles/variables/breakpoints';


interface IProfilePageProps {
    info: IProfile;
    onEmailButtonPressed: () => void;
}


const AboutMeCard = styled(Card)`
    margin-top: 3em;
    padding: 5em;
    text-align: left;

    @media ${devices.laptop} {
        padding: 3em;
    }
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

const ProjectSection = styled(StyledPageSection)`
    display: flex;
    flex-direction: column;
    align-items: center;
    & ${StyledButton} {
        margin-top: 2em;
    }
`

const DisconnectedProfilePage: React.FC<IProfilePageProps> = props => {
    const {
        profileImageUrl, relatedPeople, description,
        firstName, lastName, positionTitle, priorityStatement, 
        knowledgeableTopics, projects, tags 
    } = props.info;
    
    return (
        <>
            <PageHeader> 
                <Row center="xs" start="xs">
                    <ProfileActionsWrapper xs={12} lg={4}>
                        <CircleImage imageUrl={profileImageUrl} size='300'/>
                        <Button buttonStyle={ButtonStyle.PRIMARY} onClick={() => props.onEmailButtonPressed()}>Email me</Button>
                    </ProfileActionsWrapper>

                    <Col xs={12} lg={6}>
                        <ProfileInformationWrapper>
                            <GreetingText>Hello, my name is</GreetingText>
                            <H1>{`${firstName} ${lastName}`} <P>(She/Her)</P></H1>                             
                            <PositionTitleText>{positionTitle}, {props.info.department?.departmentName}</PositionTitleText>
                            <PriorityStatement>"{priorityStatement}"</PriorityStatement>
                            <ProfileSubheader>Ask me about:</ProfileSubheader>
                            <KnowledgeableTopics>
                                {knowledgeableTopics.map((value, i) => <Li key={i}><P>{value}</P></Li>)}
                            </KnowledgeableTopics>
                        </ProfileInformationWrapper>
                        <TagGroup tags={tags}/>
                    </Col>
                </Row>
            </PageHeader>

            <PageSection>
                <AboutMeCard>
                    <ProfileSubheader>About Me</ProfileSubheader>
                    <P>{description}</P>
                    <DepartmentLink href={props.info.department?.departmentUrl} target="_blank">
                        <P>Learn more at the {props.info.department?.departmentName}</P>
                    </DepartmentLink>
                </AboutMeCard>
            </PageSection>

            {projects.length !== 0 &&
                <ProjectSection title="Here's what I've worked on">
                    <ProjectGrid projects={projects}/>
                    <Button buttonStyle={ButtonStyle.PRIMARY}>
                        <A href={props.info.department?.departmentUrl} target='_blank'>See more of our work</A>
                    </Button>
                </ProjectSection>
            }

            { relatedPeople.length !== 0 && 
                <PageSection title="Related people">
                    <ProfileGrid profiles={relatedPeople}/>
                </PageSection>
            }
        </>
    )
}

export default DisconnectedProfilePage;