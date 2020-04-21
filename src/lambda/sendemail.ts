import { MailService } from '@sendgrid/mail';
import { MailDataRequired } from '@sendgrid/helpers/classes/mail';
import { Context, APIGatewayEvent } from 'aws-lambda'
import IEmailParameters from '../types/backend/email';
import { IAmbassadorFields } from '../types/backend/model';
import fetch, { Headers } from 'node-fetch';
import { ContentfulSingleBaseResponse } from '../types/backend/base';

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
export async function handler(event: APIGatewayEvent, context: Context) {
    try {
        let parameters: IEmailParameters = JSON.parse(event.headers.data);
        let client = new MailService();
        client.setApiKey(`${process.env.REACT_APP_SENDGRID_API_KEY}`)
        let ambassadorEmail = await getAmbassadorEmail(parameters.ambassadorId);

        if (!ambassadorEmail.email) {
            return {
                statusCode: ambassadorEmail.statusCode,
                body: JSON.stringify(ambassadorEmail.errors)
            }
        }

        let emailResponse = await client.send(buildIntroductionEmail(parameters, ambassadorEmail.email));

        return {
            statusCode: emailResponse[0].statusCode,
            body: JSON.stringify(emailResponse[0].body)
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ msg: error.response.body.errors }) 
        }
    }
}


interface IAmbassadorEmailResponse {
    statusCode: number;
    errors: string | null;
    email: string | null;
}
 // TODO: This is a horrible antipattern. But it's a *free* horrible antipattern :) This function should not be doing anything async except sending th email.
// One should set up real amazon lambda functions so that we can use Amazon step functions to orchestrate the fetch ambassador -> send email flow.
// TODO: AAH NO, make it another lambda function
async function getAmbassadorEmail(ambassadorId: string): Promise<IAmbassadorEmailResponse> {
    try {
        const profileResponse = await fetch(
            `${process.env.REACT_APP_CMS_BASE_URL}/entries/${ambassadorId}`,
            {
                method: "GET",
                headers: new Headers({
                    Authorization: `Bearer ${process.env.REACT_APP_CONTENTFUL_API_KEY}`
                })
            })
    
        if (!profileResponse.ok) {
            return {
                statusCode: profileResponse.status,
                errors: profileResponse.statusText,
                email: null
            }
        };
        
        let reducedProfile: ContentfulSingleBaseResponse<IAmbassadorFields> = await profileResponse.json();
        let email = reducedProfile.fields.email;
        if (!email) {
            return {
                statusCode: 500,
                errors: 'Failed to parse profile response.',
                email: null
            }
        }
    
        return {
            statusCode: 200,
            errors: null,
            email: email
        };

    } catch (error) {
        return {
            statusCode: 500,
            errors: error,
            email: null
        }
    }
    
}

function buildIntroductionEmail(parameters: IEmailParameters, ambassadorEmail: string): MailDataRequired {
    let { content } = parameters;

    const data: MailDataRequired = {
        from: {
            email: `${process.env.REACT_APP_SENDER_EMAIL}`
        },
        subject: content.emailSubject,
        personalizations: [
            {
                to: [
                    {
                        email: ambassadorEmail
                    }
                ],
                dynamicTemplateData: {
                    ...content
                }
            }
        ],
        templateId: `${process.env.REACT_APP_INTRODUCTION_TEMPLATE_ID}`
    }

    return data;

}