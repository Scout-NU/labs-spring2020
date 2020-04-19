export default interface IEmailParameters { 
    ambassadorId: string,
    content: IIntroductionEmailContent
}

export interface IIntroductionEmailContent {
    senderEmail: string,
    emailSubject: string,
    emailMessage: string
}