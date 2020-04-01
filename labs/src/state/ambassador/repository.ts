import * as React from 'react';
import { IManagaedAmbassador } from './model';
import * as contentful from 'contentful-management';
import Space from 'contentful-management';
import { log } from 'util';
import client from '../root/client';

declare type Space = typeof Space

export interface IProfileRepository {
    // TODO: Error stuff
    getAllProfiles(): Promise<Response>;
    // searchProfiles(queryText: string, departmentFilters: string[], topicFilters: string[]): Promise<void>; 
}

export default function useProfileRepository(): IProfileRepository {
    return {
        getAllProfiles: getAllProfiles
    }
}

const BASE_URL=`https://cdn.contentful.com/spaces/${process.env.REACT_APP_CONTENTFUL_SPACE}/environments/master`

async function getAllProfiles(): Promise<Response> {
    const allProfilesQuery = `${BASE_URL}/entries?&content_type=ambassador`
    
    return fetch(
        allProfilesQuery,
        {
            method: "GET",
            headers: new Headers({
                Authorization: `Bearer ${process.env.REACT_APP_CONTENTFUL_API_KEY}`
            })
        }
    )
}


async function getAllProfiless(): Promise<IManagaedAmbassador> {
    const allProfilesQuery = `${BASE_URL}/entries?&content_type=ambassador`
    // TODO: tidy up auth
    client.getSpace(`${process.env.REACT_APP_CONTENTFUL_SPACE}`)
    .then(space => 
        space.getEntries({ content_type: 'ambassador' }
        ).then(response =>
            response.items.map((value) => {
                {
                    id: value.sys.id,
                    ...value
                }
            })
        ).catch(error => {
            console.log(error);
            throw(error);
        })
    ).catch(error => console.log("failed to auth"))

}

