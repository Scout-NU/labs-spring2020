import React from 'react';


interface IEmailFormProps {

}

const EmailForm: React.FC<IEmailFormProps> = props => {
    React.useEffect(() => {
        async function sendEmail() {
            // let emailService = getEmailService();
            // emailService.sendEmail('studentactionportal@gmail.com', 'hi please work')
        }

        sendEmail();
    })
    return (
        <div></div>
    )
}

export default EmailForm;