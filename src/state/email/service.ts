interface IEmailResponse {
    successful: boolean;
    message: string;
}


export interface IEmailService {
    sendEmail(recipientEmail: string, message: string): Promise<IEmailResponse>;
}

export default function getEmailService(): IEmailService {
    return {
        sendEmail: sendEmail
    }
}

const emailBaseURL = `${process.env.REACT_APP_EMAIL_URL}`;

async function sendEmail(recipientEmail: string, message: string): Promise<IEmailResponse> {
    // ... Call email function here
    const emailResponse = await fetch(
        emailBaseURL,
        {
            method: "POST",
            headers: new Headers({
                "message": message,
                "to": recipientEmail,
            })
        })

    if (!emailResponse.ok) {
        // TODO: Make failed network request better
        throw Error(`${emailResponse.status}\n${emailResponse.statusText}`)
    };

    console.log(emailResponse);

    return {
        successful: true,
        message: 'idk man'
    }
}