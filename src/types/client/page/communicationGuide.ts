export interface ICommunicationGuideContent {
    pageHeader: string;
    pageSubheader: string;
    headerDecorationPageUrl: string;
    remindersIconUrl: string;
    remindersHeader: string;
    reminders: string[];
    connectionSteps: IDetailedConnectionStep[];
}

export interface IDetailedConnectionStep {
    stepTitle: string;
    stepDetails: string[];
}