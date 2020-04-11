export interface IPerson {
    id: string;
    profileImageUrl: string;
    firstName: string;
    lastName: string;
    // department: IDepartment;
    positionTitle: string;
    description: string;
    genderPronouns: string;
    tags: string[];
}

export interface IProfile extends IPerson {
    relatedPeople: IPerson[];
    priorityStatement: string; // A quote that defines their main goal
    knowledgeableTopics: string[]; // A list of things someone could ask this person about
}

export interface IDepartment {
    id: string;
    title: string;
    imageUrl: string;
    description: string;
    responsibilities: IDepartmentResponsibility[];
}

interface IDepartmentResponsibility {
    title: string; 
    description: string;
}

export interface IFilter {
    filterName: string;
    filterOptions: string[];
    id: string; // ID of the fitler. Should be unique.
}