import { IPersonDepartment } from "./department";

export interface IPerson {
    id: string;
    profileImageUrl: string;
    firstName: string;
    lastName: string;
    department: IPersonDepartment | null;
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