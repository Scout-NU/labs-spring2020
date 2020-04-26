import { ILink } from "../model/link";

export interface INotFoundContent {
    pageHeader: string;
    pageSubheader: string;
    helpfulMessage: string;
    redirectLink: ILink;
    decorationURl: string;
}