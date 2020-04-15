# [Student Action Portal](https://monum-site.netlify.com/)


## Development


#### 1. Install Dependencies
Run `yarn install` to install dependencies.

#### 2. Set up .env
This app uses environment variables to keep secrets safe. Netlify is configured to take care of these variables in production, but you need to configure your environment with them manually. In the root of your repository, create a file called `.env`. **Never commit this file to source control.** The `.gitignore` file prevents this from happening by nature. 

Your `.env` should contain the following values in order for everything to work properly (without the comments):

```
// Found in Contentful settings
REACT_APP_CONTENTFUL_API_KEY="" 


// Space ID and branch are also found in Contentful settings
REACT_APP_CMS_BASE_URL="https://cdn.contentful.com/spaces/<CONTENFUL SPACE ID>/environments/<BRANCH>" 


// You will have to create a SendGrid API key for yourself (write it down!)
REACT_APP_SENDGRID_API_KEY="" 


// This an email that is a verified sender in SendGrid
REACT_APP_SENDER_EMAIL="" 


// This is the route to the AWS Lambda function that send the emails
REACT_APP_EMAIL_URL="/.netlify/functions/sendemail" 
```

#### 3. Start local development server
1. Open a Terminal window. Run `yarn start` to launch the development server at `http://localhost:3000`.
2. Open another Terminal window. Run `yarn start:lambda`. This will launch the local Netlify lambda server at `http://localhost:9000`.

This allows this app to send emails without having to configure a Node.js server. See the docs on [Netlify Create React App Lambda](https://github.com/netlify/create-react-app-lambda), and [Netlify Lambda](https://github.com/netlify/netlify-lambda#netlify-lambda) for more context on what is going on.

## Deployment
This project is currently deployed with Netlify. It makes use of Netlify's continuous integration features, no there should be no manual deploys or builds (i.e., you should not be running either `netlify deploy` or `yarn build` manually).

When you want to deploy something to production, make a pull request with your branch against `develop`. Netlify checks will run to make sure nothing is wrong. If they pass, you can merge, and a new version will be deployed to the live site.