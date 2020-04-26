export interface ICommunicationGuideContent {
    pageHeader: string;
    pageSubheader: string;
    headerDecorationPageUrl: string;
    remindersIconUrl: string;
    remindersHeaderPage: string;
    remindersPage: string[];
    connectionStepsPage: IDetailedConnectionStep[];
}

export interface IDetailedConnectionStep {
    stepTitle: string;
    stepDetails: string[];
}