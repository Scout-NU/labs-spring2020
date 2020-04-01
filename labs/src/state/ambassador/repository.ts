import * as React from 'react';
import { IManagaedAmbassador } from './model';
import client from '../root/client';
import getAuthenticatedSpace from '../root/auth';
import type Space from 'contentful-management';

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


// async function getAllProfiless(): Promise<IManagaedAmbassador> {
async function getAllProfiless(authenticatedSpace: Space) {
    const allProfilesQuery = `${BASE_URL}/entries?&content_type=ambassador`
    // TODO: tidy up auth
    // const space = client.getSpace(`${process.env.REACT_APP_CONTENTFUL_SPACE}`)
    // .then( response => )
    // .catch(error => {
    //     console.log("Failed to authenticate space.");
    //     throw(error);
    // })
    const space = getAuthenticatedSpace().then(space => {

    });

    
    fetch(
        allProfilesQuery,
        {
            method: "GET",
            headers: new Headers({
                Authorization: `Bearer ${process.env.REACT_APP_CONTENTFUL_API_KEY}`
            })
        })
    .then(res => res.json())
    .then(response => {
        
        console.log(response);
    })
    .catch(error => {
        console.log(error);
        throw(error);
    });
}

