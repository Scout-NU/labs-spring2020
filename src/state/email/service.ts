import IEmailParameters from "../../types/cms/email";


interface IEmailResponse {
    successful: boolean;
    message: string;
}

export interface IEmailService {
    sendAmbassadorEmail(ambassadorId: string, senderEmail: string, emailSubject: string, emailMessage: string): Promise<IEmailResponse>;
}

export default function getEmailService(): IEmailService {
    return {
        sendAmbassadorEmail: sendAmbassadorEmail
    }
}

const emailBaseURL = `${process.env.REACT_APP_EMAIL_URL}`;


async function sendAmbassadorEmail(ambassadorId: string, senderEmail: string, emailSubject: string, emailMessage: string): Promise<IEmailResponse> {
    const emailHeaders: IEmailParameters = {
        ambassadorId: ambassadorId,
        content: {
            senderEmail: senderEmail,
            emailSubject: emailSubject,
            emailMessage: emailMessage
        }
    }

    const data = JSON.stringify(emailHeaders);
    console.log(data)
    const emailResponse = await fetch(
        emailBaseURL,
        {
            method: "POST",
            headers: new Headers({
                data: JSON.stringify(emailHeaders)
            })
        })

    if (!emailResponse.ok) {
        // TODO: Make failed network request better
        console.log(emailResponse)
        // throw Error(`${emailResponse.status}\n${emailResponse.statusText}`)
    };

    console.log(emailResponse);

    return {
        successful: true,
        message: 'idk man'
    }
}