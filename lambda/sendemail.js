import { MailService } from '@sendgrid/mail';

const client = new MailService();

export async function handler(event, context) {
    console.log('sending')
    const body = JSON.parse(event.body)
    console.log(body)
    const message = body.message
    
    client.setApiKey(`${process.env.REACT_APP_SENDGRID_API_KEY}`)

    return new Promise((fulfill, reject) => {
    const data = {
        from: {
          email: `${process.env.REACT_APP_SENDER_EMAIL}`
        },
        subject: 'Netlify Function - Sendgrid Email',
        to: recipientEmail,
        html: `Hey, you\'ve sent an email from Netlify Functions<br/>Message: ${message}`
    }

    client
        .send(data)
        .then(([response, body]) => {
          fulfill(response)
        })
        .catch(error => reject(error))
  })
}