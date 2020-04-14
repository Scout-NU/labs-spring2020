interface IEmailResponse {
    successful: boolean;
    message: string;
}


export interface IEmailService {
    sendEmail(): Promise<IEmailResponse>;
}

export default function getEmailService(): IEmailService {
    return {
        sendEmail: sendEmail
    }
}

const emailBaseURL = `${process.env.REACT_APP_SENDGRID_SEND_URL}`;

async function sendEmail(): Promise<IEmailResponse> {
    return {
        successful: true,
        message: 'idk man'
    }
}