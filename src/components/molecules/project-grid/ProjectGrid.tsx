import React from 'react';
import { Row } from 'react-flexbox-grid';
import { IPersonProject } from '../../../types/client/model/person';
import ImageCard from '../image-card/ImageCard';
import { ProfileWrapper } from './styled';


interface IProjectGridProps {
    projects: IPersonProject[];
}

const ProjectGrid: React.FC<IProjectGridProps> = props => {
    const { projects } = props;
    return (
        <Row top='xs' center='xs'>
            {projects.map((value, i) => {
                return (
                    <ProfileWrapper key={i} xs={11} md={6} lg={6}>
                        <ImageCard key={i} imageUrl={value.projectImageUrl} cardTitle={value.projectTitle} cardBody={value.personNotes}/>
                    </ProfileWrapper>
                )
            })}
        </Row>
    )
}

export default ProjectGrid;