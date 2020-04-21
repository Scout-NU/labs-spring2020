import React from 'react';
import { IPersonProject } from '../../types/client/model';
import ProjectPreview from '../molecules/ProjectPreview';
import styled from '../../styles/theme/Theme';
import { Col, Row } from 'react-flexbox-grid';


interface IProjectGridProps {
    projects: IPersonProject[];
}

const ProfileWrapper = styled(Col)`
    padding: 2em;
`

const ProjectGrid: React.FC<IProjectGridProps> = props => {
    const { projects } = props;
    return (
        <Row top='xs' center='xs'>
            {projects.map((value, i) => {
                return (
                    <ProfileWrapper key={i} xs={11} md={6} lg={6}>
                        <ProjectPreview  project={value} key={i}/>
                    </ProfileWrapper>
                )
            })}
        </Row>
    )
}

export default ProjectGrid;