import React from 'react';
import DisconnectedEmailForm, { IEmailFormData } from '../../../components/organisms/email-form/EmailForm';
import { H5, P } from '../../../components/atoms/typography/Typography';
import Spinner from '../../../components/atoms/spinner/Spinner';
import { mapResolvedEmailFormContent } from '../../../types/util/adpater/component/emailForm';
import { IMailFormContent } from '../../../types/client/component/emailForm';
import { SpinnerWrapper } from '../../../components/molecules/loading-spinner/styled';
import ComponentService from '../../../service/component/service';
import EmailService from '../../../service/email/service';

export interface IEmailFormProps {
    onFormCompleted: () => void;
    ambassadorId: string;
}

/**
 * This what renders the email form. Its primary responsibilities are to fetch the copy for the email form,
 * and send off the email when the message comes back from the presentational form.
 */
const EmailForm: React.FC<IEmailFormProps> = props => {
    const [showError, toggleError] = React.useState(false);
    const [showLoading, toggleLoading] = React.useState(false);
    const [showSuccess, toggleSuccess] = React.useState(false);
    const [formContent, setContent] = React.useState<IMailFormContent | null>(null);

    const formResult = (header: string, text: string) => {
        return (
            <div>
                <H5>{header}</H5>
                <P>{text}</P>
            </div>
        )
    }

    // On the first time we render, fetch the component content from the component service.
    React.useEffect(() => {
        async function getComponentContent() {
            const componentService = new ComponentService();
            componentService.getEmailFormContent()
            .then(res => {
                setContent(mapResolvedEmailFormContent(res));
            }).catch(error => console.log(error));
        }

        getComponentContent();
    }, [])

    // When the form gets submitted...
    const onEmailSelected = (data: IEmailFormData) => {
        const emailService = new EmailService();
        toggleLoading(true); // Turn on loading display, try to send an email
        emailService.sendAmbassadorEmail(props.ambassadorId, data.emailAddress, data.emailSubject, data.emailBody)
        .then(res => {
            if (res.successful) toggleSuccess(true);
            else toggleError(true);
        }).catch(err => {
            toggleError(true);
        }).finally(() => {
            toggleLoading(false);
        })
    }

    // If the form content hasn't loaded or we're sending an email, show loading
    if (!formContent || showLoading) {
        return ( 
            <SpinnerWrapper>
                <Spinner/>
            </SpinnerWrapper>
         )
    }
    
    if (showError) return formResult(formContent.failedSendMessageHeader, formContent.failedSendMessageBody)
    if (showSuccess) return formResult(formContent.successfulSendMessageHeader, formContent.successfulSendMessageBody)
    
    return <DisconnectedEmailForm content={formContent} onFormSubmitted={(data) => onEmailSelected(data)}/>
}

export default EmailForm;