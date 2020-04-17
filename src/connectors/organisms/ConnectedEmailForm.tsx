import React from 'react';
import DisconnectedEmailForm, { IEmailFormData } from '../../components/organisms/EmailForm';


interface IConnectedEmailFormProps {

}

const EmailForm: React.FC<IConnectedEmailFormProps> = props => {
    const onEmailSelected = (data: IEmailFormData) => {
        console.log(data);
    }

    const header = "Contact me!"
    const description = "Have a question or just want to get in touch? Send me an email using the form below."
    return (
        <DisconnectedEmailForm formHeaderText={header} formDescription={description} onFormSubmitted={(data) => onEmailSelected(data)}/>
    )
}

export default EmailForm;