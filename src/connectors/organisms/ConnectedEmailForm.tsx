import React from 'react';
import DisconnectedEmailForm, { IEmailFormData } from '../../components/organisms/EmailForm';
import getEmailService from '../../service/email/service';
import { H5, P } from '../../components/atoms/Typography';
import Spinner from '../../components/atoms/Spinner';
import styled from '../../styles/theme/Theme';

interface IEmailFormProps {
    onFormCompleted: () => void;
}

const SpinnerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
`

const EmailForm: React.FC<IEmailFormProps> = props => {
    const [showError, toggleError] = React.useState(false);
    const [showLoading, toggleLoading] = React.useState(false);
    const [showSuccess, toggleSuccess] = React.useState(false);
    const onEmailSelected = (data: IEmailFormData) => {
        const emailService = getEmailService();
        console.log(data);
        let id = window.location.pathname.split('/').pop();
        if (!id) { 
            props.onFormCompleted();
        } else {
            toggleLoading(true);
            emailService.sendAmbassadorEmail(id, data.emailAddress, data.emailSubject, data.emailBody)
            .then(res => {
                if (res.successful) toggleSuccess(true);
                else toggleError(true);
            }).catch(err => {
                toggleError(true);
            }).finally(() => {
                toggleLoading(false);
            })
        }
    }
    const header = "Contact me!"
    const description = "Have a question or just want to get in touch? Send me an email using the form below."
    const messageTips = ['Research your topic of interest: knowing more helps you frame deeper questions.','Say hello and be courteous.','Explain the context of your project and ask all your questions!']
    
    if (showLoading) {
        return ( 
            <SpinnerWrapper>
                <Spinner/>
            </SpinnerWrapper>
         )
    }
    
    if (showError) {
        return (
            <div>
                <H5>Whoops! Something went wrong</H5>
                <P>
                    Our bad. We couldn’t send your email. Fear not! Your message should be there if you open the form again. Please try again in a couple minutes.
                </P>
            </div>
        )
    }

    if (showSuccess) {
        return (
            <div>
                <H5>Thank you so much for your email!</H5>
                <P>
                    We are excited to read your email and we look forward to seeing the great work that you will do on your project! We will aim to get back to you within five business days. If you have any questions before then, please visit our help page.
                </P>
            </div>
        )
    }
    
    return (
        <DisconnectedEmailForm messageTips={messageTips} formHeaderText={header} formDescription={description} onFormSubmitted={(data) => onEmailSelected(data)}/>
    )
}

export default EmailForm;