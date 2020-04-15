import React from 'react';
import getEmailService from '../../state/email/service';


interface IEmailFormProps {

}

const EmailForm: React.FC<IEmailFormProps> = props => {
    React.useEffect(() => {
        async function sendEmail() {
            let emailService = getEmailService();
            emailService.sendAmbassadorEmail('RieZy4htlgVv4t3k8bWQA', 'babie@mybps.me', 'pls help, the bikes, they come', 'pls!!!!!!!!!!')
        }

        sendEmail();
    })
    return (
        <div></div>
    )
}

export default EmailForm;