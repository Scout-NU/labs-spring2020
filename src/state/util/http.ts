export function makeContentManagementGetRequest(query: string): Promise<Response> {
    const response = fetch(
        query,
        {
            method: "GET",
            headers: new Headers({
                Authorization: `Bearer ${process.env.REACT_APP_CONTENTFUL_API_KEY}`
            })
        })
        
    return response;
}

export function validateResponse(response: Response) {
    if (!response.ok) {
        // TODO: Make failed network request better
        throw Error(`${response.status}\n${response.statusText}`)
    };
}