export interface IContentManagementClient {
    makeRequest(query: string): Promise<Response>
}

export class ContentManagementClient implements IContentManagementClient {
    async makeRequest(query: string): Promise<Response> {
        return fetch(query,
            {
                method: "GET",
                headers: new Headers({
                    Authorization: `Bearer ${process.env.REACT_APP_CONTENTFUL_API_KEY}`,
                    'Cache-Control': 'public,max-age=86400'
                })
            })
            .then(response => { return response })
            .catch(error => { throw error })
    }
}