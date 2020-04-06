import * as React from 'react';
import { IManagaedAmbassador } from './model';
import * as contentful from 'contentful-management';
import client from '../root/client';
import { Collection } from 'contentful-management/typings/collection';
import { IAmbassador, IAmbassadorFields, Ambassador } from '../../types/cms/generated';
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



export interface IProfileService {
    // TODO: Error stuff
    getAllProfiles(): Promise<IAmbassador[]>;
    // searchProfiles(queryText: string, departmentFilters: string[], topicFilters: string[]): Promise<void>; 
}

export default function useProfileService(): IProfileService {
    return {
        getAllProfiles: getAllProfiles
    }
}

const BASE_URL=`https://cdn.contentful.com/spaces/${process.env.REACT_APP_CONTENTFUL_SPACE}/environments/master`

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
    return reducedProfiles.items.map((person) => resolveAmbassador(person, reducedProfiles.includes!!))
}


function resolveAmbassador(person: IAmbassador, assets: ContentfulIncludedLinks): IAmbassador {
    let assetId = person?.fields?.profilePicture?.sys.id;
    let tagIds = person?.fields?.tags?.map((tag) => tag.sys.id);

    return {
        ...person,
        fields: {
            ...person.fields,
            profilePicture: assets.Asset.find((asset) => asset.sys.id === assetId)!!,
            tags: tagIds?.map((id) => assets.Entry.find((entry) => entry.sys.id === id)!!)!!
        }
    }    
}