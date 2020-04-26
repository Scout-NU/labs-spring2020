import React from 'react';
import { H3, H5, NavigationLink, P } from '../atoms/Typography';
import { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import Input, {StyledTextInput} from '../atoms/Input';
import { Label } from '../atoms/Label';
import { Ul, Li } from '../atoms/List';
import Button, { ButtonStyle, StyledButton } from '../atoms/Button';
import styled from '../../styles/theme/Theme';
import { lunchboxColors } from '../../styles/theme/lunchbox';


interface IEmailFormProps {
    formHeaderText: string;
    formDescription: string;
    messageTips: string[];
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

const TipLink = styled(NavigationLink)`
    font-weight: normal;
    & ${P} {
        color: ${lunchboxColors.gusher};
    }
`

// TODO: We can probably set this up with Google Forms, but for now I am going to hardcode it because I don't want to add another API right now.
const DisconnectedEmailForm: React.FC<IEmailFormProps> = props => {
    const {formHeaderText, formDescription, messageTips} = props;
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
            <H3>{formHeaderText}</H3>
            <FormDescription>{formDescription}</FormDescription>
            <Form ref={formRef} onSubmit={onSubmit}>
                <Label htmlFor={nameField}>Your Full Name</Label>
                <Input name={nameField} type='text'/>

                <Label htmlFor={nameField}>Your Email Address</Label>
                <Input name={emailField} type='text'/>

                <Label htmlFor={nameField}>Subject</Label>
                <Input name={subjectField} type='text'/>

                <Label htmlFor={nameField}>Your Message</Label>
                <Ul>
                    {messageTips.map((t, key) => <Li key={key}><P>{t}</P></Li> )}
                </Ul>
                <TipLink to="/" target="_blank"><P>Tips for connecting with someone at City Hall</P></TipLink>
                <Input name={bodyField} type='text'/>
                <Button type='submit' buttonStyle={ButtonStyle.PRIMARY}>Send Message</Button>
            </Form>
        </FormWrapper>
    )
}

export default DisconnectedEmailForm;