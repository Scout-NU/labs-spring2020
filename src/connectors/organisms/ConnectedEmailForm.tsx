import React from 'react';
import DisconnectedEmailForm, { IEmailFormData } from '../../components/organisms/EmailForm';
import getEmailService from '../../service/email/service';
import { H5, P } from '../../components/atoms/Typography';
import Spinner from '../../components/atoms/Spinner';
import styled from '../../styles/theme/Theme';
import getComponentService from '../../service/component/service';
import { mapResolvedEmailFormContent } from '../../types/util/adpater/component/emailForm';
import { IMailFormContent } from '../../types/client/component/emailForm';

export interface IEmailFormProps {
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