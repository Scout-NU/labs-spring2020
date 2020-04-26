import { ILink } from "../model";

export interface IHomeContent {
    siteBannerText: string;
    pageHeader: string;
    pageSubheader: string;
    exploreLink: ILink;
    headerDecorationUrl: string;
    communicationStepsHeader: string;
    communicationSteps: ICommunicationStepPreview[];
    civicsActionTeamInfoHeader: string;
    civicsActionTeamInfoSubheader: string;
    civicsActionTeamCapabilities: string[];
    furtherHelpLink: ILink;
}

export interface ICommunicationStepPreview {
    stepPictureUrl: string;
    stepTitle: string;
    stepDescription: string;
}