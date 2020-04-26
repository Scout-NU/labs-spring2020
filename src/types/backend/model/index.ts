import * as C from ".";
import { IEntry } from "../base";

export * from "./ambassador";
export * from "./department";
export * from "./url";
export * from "./faq_link";
export * from "./communication_step";
export * from "./faq";
export * from "./search_filter";
export * from "./home_page_content";
export * from "./profile_page_content";
export * from "./search_page_content";
export * from "./email_form_content";
export * from "./connection_step";
export * from "./teacher_resource";
export * from "./ambassador_project_association";
export * from "./department_project";
export * from "./problem_tag";
export * from "./header_content";
export * from "./footer_content";
export * from "./not_found_page_content";
export * from "./page";
export * from "./page_link";
export * from "./teacher_page_content";
export * from "./faq_page_content";
export * from "./connection_guide_content";

export interface TypeDirectory {
  'ambassador': C.IAmbassador;
  'department': C.IDepartment;
  'url': C.IUrl;
  'cmsFaqLink': C.ICmsFaqLink;
  'communicationStep': C.ICommunicationStep;
  'cmsFaq': C.ICmsFaq;
  'searchFilter': C.ISearchFilter;
  'homePageContent': C.IHomePageContent;
  'profilePageContent': C.IProfilePageContent;
  'searchPageContent': C.ISearchPageContent;
  'emailFormContent': C.IEmailFormContent;
  'connectionStep': C.IConnectionStep;
  'teacherResource': C.ITeacherResource;
  'ambassadorProjectAssociation': C.IAmbassadorProjectAssociation;
  'departmentProject': C.IDepartmentProject;
  'problemTag': C.IProblemTag;
  'headerContent': C.IHeaderContent;
  'footerContent': C.IFooterContent;
  'notFoundPageContent': C.INotFoundPageContent;
  'page': C.IPage;
  'pageLink': C.IPageLink;
  'teacherPageContent': C.ITeacherPageContent;
  'faqPageContent': C.IFaqPageContent;
  'connectionGuideContent': C.IConnectionGuideContent;
}

export interface ClassDirectory {
  'ambassador': C.Ambassador;
  'department': C.Department;
  'url': C.Url;
  'cmsFaqLink': C.CmsFaqLink;
  'communicationStep': C.CommunicationStep;
  'cmsFaq': C.CmsFaq;
  'searchFilter': C.SearchFilter;
  'homePageContent': C.HomePageContent;
  'profilePageContent': C.ProfilePageContent;
  'searchPageContent': C.SearchPageContent;
  'emailFormContent': C.EmailFormContent;
  'connectionStep': C.ConnectionStep;
  'teacherResource': C.TeacherResource;
  'ambassadorProjectAssociation': C.AmbassadorProjectAssociation;
  'departmentProject': C.DepartmentProject;
  'problemTag': C.ProblemTag;
  'headerContent': C.HeaderContent;
  'footerContent': C.FooterContent;
  'notFoundPageContent': C.NotFoundPageContent;
  'page': C.Page;
  'pageLink': C.PageLink;
  'teacherPageContent': C.TeacherPageContent;
  'faqPageContent': C.FaqPageContent;
  'connectionGuideContent': C.ConnectionGuideContent;
}

export function wrap(entry: C.IAmbassador): C.Ambassador;
export function wrap(entry: C.IDepartment): C.Department;
export function wrap(entry: C.IUrl): C.Url;
export function wrap(entry: C.ICmsFaqLink): C.CmsFaqLink;
export function wrap(entry: C.ICommunicationStep): C.CommunicationStep;
export function wrap(entry: C.ICmsFaq): C.CmsFaq;
export function wrap(entry: C.ISearchFilter): C.SearchFilter;
export function wrap(entry: C.IHomePageContent): C.HomePageContent;
export function wrap(entry: C.IProfilePageContent): C.ProfilePageContent;
export function wrap(entry: C.ISearchPageContent): C.SearchPageContent;
export function wrap(entry: C.IEmailFormContent): C.EmailFormContent;
export function wrap(entry: C.IConnectionStep): C.ConnectionStep;
export function wrap(entry: C.ITeacherResource): C.TeacherResource;
export function wrap(entry: C.IAmbassadorProjectAssociation): C.AmbassadorProjectAssociation;
export function wrap(entry: C.IDepartmentProject): C.DepartmentProject;
export function wrap(entry: C.IProblemTag): C.ProblemTag;
export function wrap(entry: C.IHeaderContent): C.HeaderContent;
export function wrap(entry: C.IFooterContent): C.FooterContent;
export function wrap(entry: C.INotFoundPageContent): C.NotFoundPageContent;
export function wrap(entry: C.IPage): C.Page;
export function wrap(entry: C.IPageLink): C.PageLink;
export function wrap(entry: C.ITeacherPageContent): C.TeacherPageContent;
export function wrap(entry: C.IFaqPageContent): C.FaqPageContent;
export function wrap(entry: C.IConnectionGuideContent): C.ConnectionGuideContent;
export function wrap<CT extends keyof TypeDirectory>(entry: TypeDirectory[CT]): ClassDirectory[CT];
export function wrap(entry: IEntry<any>): IEntry<any> {
  const id = entry.sys.contentType.sys.id
  switch (id) {
    case 'ambassador':
      return new C.Ambassador(entry)
    case 'department':
      return new C.Department(entry)
    case 'url':
      return new C.Url(entry)
    case 'cmsFaqLink':
      return new C.CmsFaqLink(entry)
    case 'communicationStep':
      return new C.CommunicationStep(entry)
    case 'cmsFaq':
      return new C.CmsFaq(entry)
    case 'searchFilter':
      return new C.SearchFilter(entry)
    case 'homePageContent':
      return new C.HomePageContent(entry)
    case 'profilePageContent':
      return new C.ProfilePageContent(entry)
    case 'searchPageContent':
      return new C.SearchPageContent(entry)
    case 'emailFormContent':
      return new C.EmailFormContent(entry)
    case 'connectionStep':
      return new C.ConnectionStep(entry)
    case 'teacherResource':
      return new C.TeacherResource(entry)
    case 'ambassadorProjectAssociation':
      return new C.AmbassadorProjectAssociation(entry)
    case 'departmentProject':
      return new C.DepartmentProject(entry)
    case 'problemTag':
      return new C.ProblemTag(entry)
    case 'headerContent':
      return new C.HeaderContent(entry)
    case 'footerContent':
      return new C.FooterContent(entry)
    case 'notFoundPageContent':
      return new C.NotFoundPageContent(entry)
    case 'page':
      return new C.Page(entry)
    case 'pageLink':
      return new C.PageLink(entry)
    case 'teacherPageContent':
      return new C.TeacherPageContent(entry)
    case 'faqPageContent':
      return new C.FaqPageContent(entry)
    case 'connectionGuideContent':
      return new C.ConnectionGuideContent(entry)
    default:
      throw new Error('Unknown content type:' + id)
  }
}
