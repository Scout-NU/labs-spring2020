import React from 'react';
import { H3, } from '../../atoms/typography/Typography';
import { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import Input, { TextArea } from '../../atoms/input/Input';
import { Label } from '../../atoms/input/Label';
import { IMailFormContent } from '../../../types/client/component/emailForm';
import TextList from '../../atoms/ul/List';
import { FormWrapper, FormDescription } from './styled';
import Button from '../../atoms/button/Button';
import { ButtonStyle } from '../../atoms/button/styled';


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