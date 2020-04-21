import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { H3 } from '../atoms/Typography';
import styled from '../../styles/theme/Theme';


interface IPageSectionProps {
    title?: string;
}

export const StyledPageSection = styled.section`
    margin-bottom: 6em;
`

const PageSection: React.FC<IPageSectionProps> = props => {
    return (
        <StyledPageSection>
            <Row center="xs">
                <Col xs={10}>
                    <Row start="xs">
                        {props.title && 
                            <Col xs={12}>
                                <H3>{props.title}</H3>
                            </Col>
                        }
                        {props.children}
                    </Row>
                </Col>
            </Row>
        </StyledPageSection>
    )
}

export default PageSection;