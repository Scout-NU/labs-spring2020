import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { H1, P, A } from '../../atoms/typography/Typography';
import TagGroup from '../../molecules/tag-group/TagGroup';
import ProjectGrid from '../../molecules/project-grid/ProjectGrid';
import EmailForm from '../../../connectors/organisms/email-form/ConnectedEmailForm';
import PersonProfileImageGroup from '../../molecules/profile-image-group/PersonProfileImageGroup';
import { PageHeader, HeaderVariant, PageSection } from '../../templates/page/Page';
import CardModal from '../../molecules/modal/CardModal';
import { IProfile } from '../../../types/client/model/person';
import TextList from '../../atoms/ul/List';
import { IProfileContent } from '../../../types/client/page/profile';
import ContactListToggle from '../../molecules/contact-toggle/ContactListToggle';
import { ProfileActionsWrapper, ProfileInformationWrapper, GreetingText, PositionTitleText, PriorityStatement, ProfileSubheader, AboutMeCard, DepartmentLink, ProjectSection } from './styled';
import Button from '../../atoms/button/Button';
import { ButtonStyle } from '../../atoms/button/styled';
import AmbassadorPreviewGrid from '../../molecules/profile-grid/ProfileGrid';


interface IProfilePageProps {
    info: IProfile;
    content: IProfileContent;
}

const DisconnectedProfilePage: React.FC<IProfilePageProps> = props => {
    const [showForm, toggleForm] = React.useState(false);
    const { content } = props;

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
                        <PersonProfileImageGroup profileImageUrl={profileImageUrl} departmentImageUrl={department?.departmentImage} />
                        <Row center="xs">
                            <ContactListToggle person={props.info}/>
                            <Button buttonStyle={ButtonStyle.PRIMARY} onClick={() => toggleForm(true)}>Email me</Button>
                        </Row>
                    </ProfileActionsWrapper>

                    <Col xs={12} lg={6}>
                        <ProfileInformationWrapper>
                            <GreetingText>Hello, my name is</GreetingText>
                            <H1>{`${firstName} ${lastName}`} <P>(She/Her)</P></H1>                             
                            <PositionTitleText>{positionTitle}, {props.info.department?.departmentName}</PositionTitleText>
                            <PriorityStatement>"{priorityStatement}"</PriorityStatement>
                            <ProfileSubheader>Ask me about:</ProfileSubheader>
                                <TextList items={knowledgeableTopics}/>
                        </ProfileInformationWrapper>
                        <TagGroup tags={tags}/>
                    </Col>
                </Row>
            </PageHeader>

            <PageSection>
                <AboutMeCard>
                    <ProfileSubheader>{content.ambassadorDescriptionHeader}</ProfileSubheader>
                    <P>{description}</P>
                    <DepartmentLink href={props.info.department?.departmentUrl} target="_blank">
                        <P>Learn more at the {props.info.department?.departmentName}</P>
                    </DepartmentLink>
                </AboutMeCard>
            </PageSection>

            {projects.length !== 0 &&
                <ProjectSection title={content.projectSectionHeader}>
                    <ProjectGrid projects={projects}/>
                    <Button buttonStyle={ButtonStyle.PRIMARY}>
                        <A href={props.info.department?.departmentUrl} target='_blank'>{content.seeMoreDepartmentWorkLabel}</A>
                    </Button>
                </ProjectSection>
            }

            { relatedPeople.length !== 0 && 
                <PageSection title={content.relatedAmbassadorsSectionHeader}>
                    <AmbassadorPreviewGrid profiles={relatedPeople}/>
                </PageSection>
            }

            <CardModal onModalClosed={() => toggleForm(false)} isOpen={showForm}>
                <EmailForm onFormCompleted={() => toggleForm(false)}/>
            </CardModal>

        </>
    )
}

export default DisconnectedProfilePage;