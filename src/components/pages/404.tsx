import React from 'react';
import styled from '../../styles/theme/Theme';
import { H1, P, A } from '../atoms/Typography';
import Button, { ButtonStyle } from '../atoms/Button';
import { lunchboxColors } from '../../styles/theme/lunchbox';
import { INotFoundContent } from '../../types/client/page/notFound';
import devices from '../../styles/variables/breakpoints';

const Blob = styled.div`
    width: fit-content;
    height: fit-content;
    border-radius: 70% 30% 30% 70% / 60% 40% 60% 40%;
    background-color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 9em;
    @media ${devices.laptop} {
        padding: 8em;
    }
`

const Content = styled.div`
    padding: 3em;

    & ${P} {
        margin-bottom: 3em;
    }

    @media ${devices.laptop} {
        padding: 0 0 5em 0;
    }
`

const PageWrapper = styled.div`
    min-height: 100vh;
    background-color: ${lunchboxColors.carton};
`

const Decoration = styled.img`
    width: 20em;
    position: absolute;
    right: 0;
    bottom: 0;

    @media ${devices.laptop} {
        padding: 5em 0 0 0;
        right: 10%;
        width: 16em;
    }
`

interface IDisconnectedNotFoundPageProps {
    content: INotFoundContent;
}

const DisconnectedNotFoundPage: React.FC<IDisconnectedNotFoundPageProps> = props => {
    const { content } = props;

    return (
        <PageWrapper>
            <Blob>
                <Content>
                    <H1>{content.pageHeader}</H1>
                    <P>{content.pageSubheader}</P>
                    <Button buttonStyle={ButtonStyle.PRIMARY}>
                        <A href={content.redirectLink.linkURL}>{content.helpfulMessage}</A>
                    </Button>
                    <Decoration src={content.decorationURl}/>
                </Content>
            </Blob>
        </PageWrapper>
    )
}

export default DisconnectedNotFoundPage;