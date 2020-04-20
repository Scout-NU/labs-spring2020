export interface IPerson {
    id: string;
    profileImageUrl: string;
    firstName: string;
    lastName: string;
    department: IAmbassadorDepartment | null;
    positionTitle: string;
    description: string;
    genderPronouns: string;
    tags: string[];
}

export interface IProfile extends IPerson {
    relatedPeople: IPerson[];
    priorityStatement: string; // A quote that defines their main goal
    knowledgeableTopics: string[]; // A list of things someone could ask this person about
    projects: IPersonProject[];
}

export interface IPersonProject {
    projectImageUrl: string;
    projectTitle: string;
    personNotes: string;
}

export interface IAmbassadorDepartment {
    id: string;
    departmentName: string;
    departmentUrl: string;
    departmentImage: string;
}

export interface IFilter {
    filterName: string;
    filterLabels: string[];
    selectedFilters: string[];
    id: string; // ID of the fitler. Should be unique.
}

export interface ILink {
    linkTitle: string;
    linkURL: string;
}

