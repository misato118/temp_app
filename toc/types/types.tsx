export enum ItemCategory {
    FURNITURE,
    MUSIC,
    TOOL,
}

export type Company = {
    id: number;
    name: string;
    email: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    logoURL: string;
}

export type Item = {
    id: number;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    category: ItemCategory;
    fee: number;
    feeType: string;
    maxDuration: number;
    maxDurationType: string;
    imageURL: string;
    deposit: number;
    company: Company;
    reviews: Review[];
}

export type Review = {
    id: number;
    title: string;
    contents: string;
    rating: number;
    createdAt: Date;
    updatedAt: Date;
}