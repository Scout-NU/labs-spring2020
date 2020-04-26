import React from 'react';
import Card from '../atoms/Card';
import { H5, P } from '../atoms/Typography';
import styled from '../../styles/theme/Theme';
import { IPersonProject } from '../../types/client/model/person';


interface IProjectPreviewProps {
    project: IPersonProject;
}

const ProjectImage = styled.img`
    width: 100%;
    border-radius: inherit;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
`

const ProjectCard = styled(Card)`
    padding: 0;
    text-align: left;
`

const ProjectInformation = styled.div`
    padding: 3em;
`

const ProjectPreview: React.FC<IProjectPreviewProps> = props => {
    let { project } = props;
    return (
        <ProjectCard>
            <ProjectImage src={project.projectImageUrl}/>
            <ProjectInformation>
                <H5>{project.projectTitle}</H5>
                <P>{project.personNotes}</P>
            </ProjectInformation>
        </ProjectCard>
    )
}

export default ProjectPreview;