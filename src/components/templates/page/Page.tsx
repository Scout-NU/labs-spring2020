import React from 'react';
import { H3 } from '../../atoms/typography/Typography';
import { StyledHeaderContainer, StyledPageSection, HeaderBlob, HeaderContent } from './styled';

export interface IHeaderProps {
    headerVariant: HeaderVariant;
}

// These represent different colors that the header shape could be.
export enum HeaderVariant {
    HOME,
    SEARCH,
    PROFILE,
    CONVERSATION_GUIDE,
    FAQ
}

export const PageHeader: React.FC<IHeaderProps> = props => {
    const { headerVariant } = props;

    return (
        <StyledHeaderContainer>
            <HeaderContent headerVariant={headerVariant}>
                {props.children}
            </HeaderContent>
            <HeaderBlob headerVariant={headerVariant} version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 1369 321.5">
                <g> <path d="M88.3,146.5C170.1,175.6,962,272.5,1369,321V0H0C0.5,66,10.8,118.9,88.3,146.5z" id="blob"/> </g>
            </HeaderBlob>
        </StyledHeaderContainer>
    )
}

interface IPageSectionProps {
    title?: string;
}

export const PageSection: React.FC<IPageSectionProps> = props => {
    return (
        <StyledPageSection>
            {props.title && <H3>{props.title}</H3>}
            {props.children}
        </StyledPageSection>
    )
}

