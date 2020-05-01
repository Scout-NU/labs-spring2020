import IEmailParameters from "../../types/backend/email";


interface IEmailResponse {
    successful: boolean;
}

export interface IEmailService {
    sendAmbassadorEmail(ambassadorId: string, senderEmail: string, emailSubject: string, emailMessage: string): Promise<IEmailResponse>;
}

export default class EmailService implements IEmailService {
    private emailBaseURL = `${process.env.REACT_APP_EMAIL_URL}`;

    async sendAmbassadorEmail(ambassadorId: string, senderEmail: string, emailSubject: string, emailMessage: string): Promise<IEmailResponse> {
        const emailHeaders: IEmailParameters = {
            ambassadorId: ambassadorId,
            content: {
                senderEmail: senderEmail,
                emailSubject: emailSubject,
                emailMessage: emailMessage
            }
        }
    
        const emailResponse = await fetch(
            this.emailBaseURL,
            {
                method: "POST",
                headers: new Headers({
                    data: JSON.stringify(emailHeaders)
                })
            })
    
        if (!emailResponse.ok) {
            // TODO: Make failed network request better
            console.log(emailResponse)
        };
        
        return {
            successful: emailResponse.ok
        }
    }

}