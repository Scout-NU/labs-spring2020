import React from 'react';
import styled from '../../styles/theme/Theme';
import devices from '../../styles/variables/breakpoints';
import { IProfile } from '../../types/client/model';
import { Row, Col } from 'react-flexbox-grid';
import { CircleImageSize } from '../atoms/CircleImage';
import Button, { ButtonStyle, StyledButton } from '../atoms/Button';
import { H1, P, H4, H5, A } from '../atoms/Typography';
import TagGroup from '../molecules/TagGroup';
import { Ul, Li } from '../atoms/List';
import Card from '../atoms/Card';
import ProfileGrid from '../organisms/ProfileGrid';
import ProjectGrid from '../organisms/ProjectGrid';
import EmailForm from '../../connectors/organisms/ConnectedEmailForm';
import PersonProfileImageGroup from '../molecules/PersonProfileImageGroup';
import { PageHeader, HeaderVariant, PageSection, StyledPageSection } from '../templates/Page';
import CardModal from '../molecules/CardModal';


interface IProfilePageProps {
    info: IProfile;
}


const AboutMeCard = styled(Card)`
    margin-top: 3em;
    padding: 5em;
    text-align: left;
    margin-top: -20%;
    z-index: 1;

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
    const [showForm, toggleForm] = React.useState(false);

    const {
        profileImageUrl, relatedPeople, description,
        firstName, lastName, positionTitle, priorityStatement, 
        knowledgeableTopics, projects, tags, department
    } = props.info;
    
    return (
        <>
            <PageHeader headerVariant={HeaderVariant.PROFILE}> 
                <Row center="xs" >
                    <ProfileActionsWrapper xs={12} md={4}>
                        <PersonProfileImageGroup profileImageUrl={profileImageUrl} departmentImageUrl={department?.departmentImage} size={CircleImageSize.LARGE} />
                        <Button buttonStyle={ButtonStyle.PRIMARY} onClick={() => toggleForm(true)}>Email me</Button>
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

            <CardModal onModalClosed={() => toggleForm(false)} isOpen={showForm}>
                <EmailForm onFormCompleted={() => toggleForm(false)}/>
            </CardModal>

        </>
    )
}

export default DisconnectedProfilePage;