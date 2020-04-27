import React from 'react';
import { H3, H5, } from '../atoms/Typography';
import { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import Input, {StyledTextInput, TextArea} from '../atoms/Input';
import { Label } from '../atoms/Label';
import Button, { ButtonStyle, StyledButton } from '../atoms/Button';
import styled from '../../styles/theme/Theme';
import TextList from '../atoms/List';
import { IMailFormContent } from '../../types/client/component/emailForm';


interface IDisconnectedEmailFormProps {
    content: IMailFormContent;
    onFormSubmitted: (data: IEmailFormData) => void;
}

export interface IEmailFormData {
    fullName: string;
    emailAddress: string;
    emailSubject: string;
    emailBody: string;
}

const FormWrapper = styled.div`
    & ${StyledButton} {
        margin-top: 2em;
    }

    & ${StyledTextInput} {
        margin-bottom: 1em;
    }
`

const FormDescription = styled(H5)`
    font-weight: normal;
`

const DisconnectedEmailForm: React.FC<IDisconnectedEmailFormProps> = props => {
    const {content} = props;
    const formRef = React.useRef<FormHandles>(null);
    const nameField = 'fullName';
    const emailField = 'emailAddress';
    const subjectField = 'emailSubject';
    const bodyField = 'emailBody';

    const onSubmit: SubmitHandler<IEmailFormData> = (data) => {
        props.onFormSubmitted(data)
    }

    return (
        <FormWrapper>
            <H3>{content.formHeader}</H3>
            <FormDescription>{content.formHeader}</FormDescription>
            <Form ref={formRef} onSubmit={onSubmit}>
                <Label htmlFor={nameField}>{content.nameFieldLabel}</Label>
                <Input name={nameField} type='text' placeholder={content.nameFieldHint}/>

                <Label htmlFor={emailField}>{content.emailFieldLabel}</Label>
                <Input name={emailField} type='text' placeholder={content.studentEmailFieldHint}/>

                <Label htmlFor={subjectField}>{content.subjectFieldLabel}</Label>
                <Input name={subjectField} type='text' placeholder={content.subjectFieldHint}/>

                <Label htmlFor={bodyField}>{content.messageFieldLabel}</Label>
                <TextList items={content.messageFieldSuggestions}/>
                <TextArea name={bodyField} placeholder={content.messageFieldHint}/>
                <Button type='submit' buttonStyle={ButtonStyle.PRIMARY}>{content.submitLabel}</Button>
            </Form>
        </FormWrapper>
    )
}

export default DisconnectedEmailForm;