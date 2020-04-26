import { ILink } from "../model";

export interface INotFoundPageContent {
    pageHeader: string;
    pageSubheader: string;
    helpfulMessage: string;
    redirectLink: ILink;
    decorationURl: string;
}