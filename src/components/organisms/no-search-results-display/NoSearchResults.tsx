import React from 'react';
import Card from '../../atoms/card/Card';
import { H5 } from '../../atoms/typography/Typography';
import TextList from '../../atoms/ul/List';
import { NoResultsWrapper, ImageWrapper, TextWrapper } from './styled';

interface INoSearchResultsProps {
    header: string;
    missingContentImageUrl: string;
    alternateOptions: string[];
}

const NoSearchResults: React.FC<INoSearchResultsProps> = props => {
    return (
        <Card>
            <NoResultsWrapper>
                <ImageWrapper>
                    <img src={props.missingContentImageUrl} alt='Sad person that is looking for something but cannot find it'/>
                </ImageWrapper>
                <TextWrapper>
                    <H5> {props.header} </H5>
                    <TextList items={props.alternateOptions}/>
                </TextWrapper>
            </NoResultsWrapper>
        </Card>
    )
}

export default NoSearchResults;