export interface IPerson {
    id: string;
    profileImageUrl: string;
    name: string;
    department: IDepartment;
    description: string;
    tags: string[];
}

export interface IDepartment {
    id: string;
    title: string;
    imageUrl: string;
    description: string;
}