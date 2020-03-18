export interface IPerson {
    id: string;
    profileImageUrl: string;
    name: string;
    department: IDepartment;
    description: string;
    tags: string[];
    relatedPeople: IPerson[];
}

export interface IProfile extends IPerson {
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