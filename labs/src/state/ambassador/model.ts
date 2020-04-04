// Interface representing an Ambassador in the CMS
export interface IManagaedAmbassador {
    id: string; // ID of the person
    firstName: string; // first name
    lastName: string; // last name
    positionTitle: string; // The position title of the person
    departmentId: string; // id of department they work for
    profileImageUrl: string; // profile image url
    ambassadorDescription: string; // Description of what this person does
    preferredPronouns: string; // preferred pronouns
    problemTags: string[]; // Tags that relate to issues this peron tackles
    email: string; // Ambassador's email
    priorityStatement: string; // A quote about what this person cares most for
    knowledgeableTopics: string; // Topics to ask this person about
    relatedPeople: string[]; // ids of related people
    projects: string[]; // IDs of projects this person has worked on
}