import { MailService } from '@sendgrid/mail';
import { MailDataRequired } from '@sendgrid/helpers/classes/mail';
import { Context, APIGatewayEvent } from 'aws-lambda'
import IEmailParameters from '../types/backend/email';
import { IAmbassadorFields } from '../types/backend/model';
import fetch, { Headers } from 'node-fetch';
import { ContentfulSingleBaseResponse } from '../types/backend/base';

 
/**
 * Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
 * 
 * This is the function that the email service uses to send an email. Basically, a network request is made to a
 * special URL that ends up calling this function. That URL is of the form /.netlify/functions/???, the real 
 * URL is an environment variable. 
 * 
 * This method expects an ambassador ID and some email content. It finds the ambassador's email by fetching it by ID,
 * and then sends a message to that Email, erroring out if any stage of that process fails. 
 * 
 * 
 * @param event 
 * @param context 
 */
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
/*
REFACTOR: This is an antipattern. 
But it's a *free* antipattern :) This function should not be doing anything async except sending the email.

For the Netlify free functions, there is a timeout limit of 10 seconds. It should never take more than 10 seconds to 
fetch the ambassador and send the email, but under poor conditions it theoretically could. Also, if this were the real
world and we had to pay for this, this function would run longer (because it's doing two things instead of one), which is
slightly more expensive. 

At some point, real Lambda functions will probably need to be set up for this project. When it comes to that, AWS has 
a thing called Amazon Step Functions, which allow you to sequentially call individual functions that pipe data to one another.
It would be best to have this just kick off a flow of function one that Fetches Email -> function two that Sends Email.
*/
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
                errors: 'Failed to find email for given ambassador ID.',
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