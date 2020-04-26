import { ILink } from "../model/link";

export interface INotFoundPageContent {
    pageHeader: string;
    pageSubheader: string;
    helpfulMessage: string;
    redirectLink: ILink;
    decorationURl: string;
}