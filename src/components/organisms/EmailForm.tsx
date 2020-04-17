import React from 'react';
import getEmailService from '../../service/email/service';
import Card from '../atoms/Card';
import { H1, H2, NavigationLink } from '../atoms/Typography';
import { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import Input from '../atoms/Input';
import { Label } from '../atoms/Label';
import { Ul } from '../atoms/List';
import Button, { ButtonStyle } from '../atoms/Button';


interface IEmailFormProps {
    formHeaderText: string;
    formDescription: string;
    onFormSubmitted: (data: IEmailFormData) => void;
}

export interface IEmailFormData {
    fullName: string;
    emailAddress: string;
    emailSubject: string;
    emailBody: string;
}

// TODO: We can probably set this up with Google Forms, but for now I am going to hardcode it because I don't want to add another API right now.
const DisconnectedEmailForm: React.FC<IEmailFormProps> = props => {
    const formRef = React.useRef<FormHandles>(null);
    const nameField = 'fullName';
    const emailField = 'emailAddress';
    const subjectField = 'emailSubject';
    const bodyField = 'emailBody';

    const onSubmit: SubmitHandler<IEmailFormData> = (data) => {
        props.onFormSubmitted(data)
    }

    return (
        <Card>
            <label></label>
            <H1>Contact me!</H1>
            <H2>Have a question or just want to get in touch? Send me an email using the form below.</H2>
            <Form ref={formRef} onSubmit={onSubmit}>
                <Label htmlFor={nameField}>Your Full Name</Label>
                <Input name={nameField} type='text'/>

                <Label htmlFor={nameField}>Your Email Address</Label>
                <Input name={emailField} type='text'/>

                <Label htmlFor={nameField}>Subject</Label>
                <Input name={subjectField} type='text'/>

                <Label htmlFor={nameField}>Your Message</Label>
                <Ul>
                    <li>Research your topic of interest: knowing more helps you frame deeper questions.</li>
                    <li>Say hello and be courteous.</li>
                    <li>Explain the context of your project and ask all your questions!</li>
                </Ul>
                <NavigationLink to="/" target="_blank">Tips for connecting with someone at City Hall</NavigationLink>
                <Input name={bodyField} type='text'/>
                <Button type='submit' buttonStyle={ButtonStyle.PRIMARY}>Send Message</Button>
            </Form>
        </Card>
    )
}

export default DisconnectedEmailForm;