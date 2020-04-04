import * as contentful from 'contentful-management';

const client = contentful.createClient({
    accessToken: `${process.env.REACT_APP_CONTENTFUL_API_KEY}`
})

export default client;