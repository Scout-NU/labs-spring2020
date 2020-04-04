import * as React from 'react';
import { IManagaedAmbassador } from './model';
import * as contentful from 'contentful-management';
import client from '../root/client';
import { Collection } from 'contentful-management/typings/collection';
import { IAmbassador, IAmbassadorFields } from '../../types/cms/generated';
import { Resolved, IAsset, IEntry } from '../../types/cms/base';

interface ContentfulIncludedLinks {
    Entry: any[];
    Asset: IAsset[];
}

interface ContentfulBaseResponse<EntryType> {
    sys: any;
    total: number;
    skip: number;
    limit: number;
    items: Resolved<EntryType>[];
    includes?: ContentfulIncludedLinks;
}



export interface IProfileRepository {
    // TODO: Error stuff
    getAllProfiles(): Promise<IAmbassador[]>;
    // searchProfiles(queryText: string, departmentFilters: string[], topicFilters: string[]): Promise<void>; 
}

export default function useProfileRepository(): IProfileRepository {
    return {
        getAllProfiles: getAllProfiles
    }
}

const BASE_URL=`https://cdn.contentful.com/spaces/${process.env.REACT_APP_CONTENTFUL_SPACE}/environments/master`

// async function getAllProfiles(): Promise<Response> {
//     const allProfilesQuery = `${BASE_URL}/entries?&content_type=ambassador`
    
//     return fetch(
//         allProfilesQuery,
//         {
//             method: "GET",
//             headers: new Headers({
//                 Authorization: `Bearer ${process.env.REACT_APP_CONTENTFUL_API_KEY}`
//             })
//         }
//     )
// }


async function getAllProfiles(): Promise<IAmbassador[]> {
    const allProfilesQuery = `${BASE_URL}/entries?&content_type=ambassador`
    const profileResponse = await fetch(
            allProfilesQuery,
            {
                method: "GET",
                headers: new Headers({
                    Authorization: `Bearer ${process.env.REACT_APP_CONTENTFUL_API_KEY}`
                })
            })

    if (!profileResponse.ok) {
        throw Error(profileResponse.statusText);
    }
    // TODO: Fallback fields for missing stuff - empty strings and unpublished content is underfined

    let reducedProfiles: ContentfulBaseResponse<IAmbassador> = await profileResponse.json();
    let withPictures: ContentfulBaseResponse<IAmbassador> = {
        ...reducedProfiles,
        items: reducedProfiles.items.map((person) => {
            return {
                ...person,
                fields: {
                    ...person.fields,
                    profilePicture: resolveAsset(person, reducedProfiles.includes!!)
                }
            }
        })
    }

    console.log(withPictures)
    
    // console.log(reducedProfiles.items)

    // console.log(`assets `)
    // console.log(withPictures)

    return withPictures.items;
}

function resolveAsset(person: IAmbassador, assets: ContentfulIncludedLinks): IAsset {
    let assetId = person.fields.profilePicture.sys.id;
    return assets.Asset.find((asset) => asset.sys.id === assetId)!!;
    
}