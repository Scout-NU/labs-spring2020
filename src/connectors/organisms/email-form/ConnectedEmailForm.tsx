import React from 'react';
import DisconnectedEmailForm, { IEmailFormData } from '../../../components/organisms/email-form/EmailForm';
import getEmailService from '../../../service/email/service';
import { H5, P } from '../../../components/atoms/typography/Typography';
import Spinner from '../../../components/atoms/spinner/Spinner';
import getComponentService from '../../../service/component/service';
import { mapResolvedEmailFormContent } from '../../../types/util/adpater/component/emailForm';
import { IMailFormContent } from '../../../types/client/component/emailForm';
import { SpinnerWrapper } from '../../../components/molecules/loading-spinner/styled';

export interface IEmailFormProps {
    onFormCompleted: () => void;
}

const EmailForm: React.FC<IEmailFormProps> = props => {
    const [showError, toggleError] = React.useState(false);
    const [showLoading, toggleLoading] = React.useState(false);
    const [showSuccess, toggleSuccess] = React.useState(false);
    const [formContent, setContent] = React.useState<IMailFormContent | null>(null);

    const resultModal = (header: string, text: string) => {
        return (
            <div>
                <H5>{header}</H5>
                <P>{text}</P>
            </div>
        )
    }

    React.useEffect(() => {
        async function getComponentContent() {
            const componentService = getComponentService();
            componentService.getEmailFormContent()
            .then(res => {
                setContent(mapResolvedEmailFormContent(res));
            }).catch(error => console.log(error));
        }

        getComponentContent();
    }, [])

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
    
    if (!formContent || showLoading) {
        return ( 
            <SpinnerWrapper>
                <Spinner/>
            </SpinnerWrapper>
         )
    }
    
    if (showError)  return resultModal(formContent.failedSendMessageHeader, formContent.failedSendMessageBody)
    if (showSuccess) return resultModal(formContent.successfulSendMessageHeader, formContent.successfulSendMessageBody)
    
    return <DisconnectedEmailForm content={formContent} onFormSubmitted={(data) => onEmailSelected(data)}/>
}

export default EmailForm;