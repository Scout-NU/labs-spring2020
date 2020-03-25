import { createClient } from 'urql'
require('dotenv').config();

const client  = createClient({
    url: 'https://labs-test.prismic.io/graphql',
    fetchOptions: () => {
        const token = process.env.REACT_APP_PRISMIC_API_KEY;
        
        return {
            mode: "cors",
            method: "POST",
            headers: { 
                authorization: token ? `Bearer ${token}` : '',
                "Prismic-Ref": 'XnZ0OxIAACgAHdVu'
                
         },
        };
    }
});


export default client;