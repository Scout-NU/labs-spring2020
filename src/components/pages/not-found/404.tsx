import React from 'react';
import { H1, P, A } from '../../atoms/typography/Typography';
import Button from '../../atoms/button/Button';
import { INotFoundContent } from '../../../types/client/page/notFound';
import { PageWrapper, Content, Decoration, Blob } from './styles';
import { ButtonStyle } from '../../atoms/button/styled';


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