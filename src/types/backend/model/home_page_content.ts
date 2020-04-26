import { wrap } from ".";
import { Asset, Entry, IAsset, IEntry, ILink, isAsset, isEntry, ISys } from "../base";
import { CommunicationStep, ICommunicationStep } from "./communication_step";
import { IPageLink, PageLink } from "./page_link";
import { PageDiscriminator } from "./page";

export interface IHomePageContentFields {
  siteBannerText?: string;
  pageHeader?: string;
  pageSubheader?: string;
  exploreLink?: ILink<'Entry'> | IPageLink;
  headerDecoration?: ILink<'Asset'> | IAsset;
  communicationStepsHeader?: string;
  communicationSteps?: Array<ILink<'Entry'> | ICommunicationStep>;
  civicsActionTeamInfoHeader?: string;
  civicsActionTeamInfoSubheader?: string;
  civicsActionTeamCapabilities?: string[];
  furtherHelpLink?: ILink<'Entry'> | IPageLink;
}

/**
 * Home Page Content
 * This is the content in the Home Page.
 */
export interface IHomePageContent extends IEntry<IHomePageContentFields> {
  kind: PageDiscriminator.HOME;
}

export function isHomePageContent(entry: IEntry<any>): entry is IHomePageContent {
  return entry &&
    entry.sys &&
    entry.sys.contentType &&
    entry.sys.contentType.sys &&
    entry.sys.contentType.sys.id == 'homePageContent'
}

// export class HomePageContent extends Entry<IHomePageContentFields> implements IHomePageContent {
//   public readonly sys!: ISys<'Entry'>;
//   public readonly fields!: IHomePageContentFields;

//   get siteBannerText(): string | undefined {
//     return this.fields.siteBannerText
//   }

//   get site_banner_text(): string | undefined {
//     return this.fields.siteBannerText
//   }

//   get pageHeader(): string | undefined {
//     return this.fields.pageHeader
//   }

//   get page_header(): string | undefined {
//     return this.fields.pageHeader
//   }

//   get pageSubheader(): string | undefined {
//     return this.fields.pageSubheader
//   }

//   get page_subheader(): string | undefined {
//     return this.fields.pageSubheader
//   }

//   get exploreLink(): PageLink | null | undefined {
//     return !this.fields.exploreLink ? undefined :
//       (isEntry(this.fields.exploreLink) ? wrap<'pageLink'>(this.fields.exploreLink) : null)
//   }

//   get explore_link(): PageLink | null | undefined {
//     return !this.fields.exploreLink ? undefined :
//       (isEntry(this.fields.exploreLink) ? wrap<'pageLink'>(this.fields.exploreLink) : null)
//   }

//   get headerDecoration(): Asset | null | undefined {
//     return !this.fields.headerDecoration ? undefined :
//       (isAsset(this.fields.headerDecoration) ? new Asset(this.fields.headerDecoration) : null)
//   }

//   get header_decoration(): Asset | null | undefined {
//     return !this.fields.headerDecoration ? undefined :
//       (isAsset(this.fields.headerDecoration) ? new Asset(this.fields.headerDecoration) : null)
//   }

//   get communicationStepsHeader(): string | undefined {
//     return this.fields.communicationStepsHeader
//   }

//   get communication_steps_header(): string | undefined {
//     return this.fields.communicationStepsHeader
//   }

//   get communicationSteps(): Array<CommunicationStep | null> | undefined {
//     return !this.fields.communicationSteps ? undefined :
//       this.fields.communicationSteps.map((item) =>
//         isEntry(item) ? wrap<'communicationStep'>(item) : null
//       )
//   }

//   get communication_steps(): Array<CommunicationStep | null> | undefined {
//     return !this.fields.communicationSteps ? undefined :
//       this.fields.communicationSteps.map((item) =>
//         isEntry(item) ? wrap<'communicationStep'>(item) : null
//       )
//   }

//   get civicsActionTeamInfoHeader(): string | undefined {
//     return this.fields.civicsActionTeamInfoHeader
//   }

//   get civics_action_team_info_header(): string | undefined {
//     return this.fields.civicsActionTeamInfoHeader
//   }

//   get civicsActionTeamInfoSubheader(): string | undefined {
//     return this.fields.civicsActionTeamInfoSubheader
//   }

//   get civics_action_team_info_subheader(): string | undefined {
//     return this.fields.civicsActionTeamInfoSubheader
//   }

//   get civicsActionTeamCapabilities(): string[] | undefined {
//     return this.fields.civicsActionTeamCapabilities
//   }

//   get civics_action_team_capabilities(): string[] | undefined {
//     return this.fields.civicsActionTeamCapabilities
//   }

//   get furtherHelpLink(): PageLink | null | undefined {
//     return !this.fields.furtherHelpLink ? undefined :
//       (isEntry(this.fields.furtherHelpLink) ? wrap<'pageLink'>(this.fields.furtherHelpLink) : null)
//   }

//   get further_help_link(): PageLink | null | undefined {
//     return !this.fields.furtherHelpLink ? undefined :
//       (isEntry(this.fields.furtherHelpLink) ? wrap<'pageLink'>(this.fields.furtherHelpLink) : null)
//   }

//   constructor(entry: IHomePageContent);
//   constructor(id: string, fields: IHomePageContentFields);
//   constructor(entryOrId: IHomePageContent | string, fields?: IHomePageContentFields) {
//     super(entryOrId, 'homePageContent', fields)
//   }
// }
