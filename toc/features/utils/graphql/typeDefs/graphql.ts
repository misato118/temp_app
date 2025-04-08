/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

/** Owner application status for an item */
export enum ApplicationStatus {
  /** When an owner application is accepted */
  Accepted = 'ACCEPTED',
  /** When an owner applied to publish an item. */
  Applied = 'APPLIED',
  /** When an owner application is declined. */
  Declined = 'DECLINED'
}

export type Company = {
  __typename?: 'Company';
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  email: Scalars['String']['output'];
  employees?: Maybe<Array<Employee>>;
  id: Scalars['Int']['output'];
  items?: Maybe<Array<Item>>;
  logoURL?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CreateCompanyInput = {
  description: Scalars['String']['input'];
  email: Scalars['String']['input'];
  logoURL: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateEmployeeInput = {
  birthDate: Scalars['DateTime']['input'];
  /** The name of a company this employee works for */
  company: Scalars['String']['input'];
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
};

export type CreateFormInput = {
  itemId: Scalars['Int']['input'];
  offeringDuration: Scalars['Int']['input'];
  offeringPrice: Scalars['Float']['input'];
  renterId: Scalars['Int']['input'];
};

export type CreateItemInput = {
  category?: InputMaybe<ItemCategory>;
  company: Scalars['String']['input'];
  deposit?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  fee?: InputMaybe<Scalars['Float']['input']>;
  feeType?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  imageURL?: InputMaybe<Scalars['String']['input']>;
  maxDuration?: InputMaybe<Scalars['Int']['input']>;
  maxDurationType?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type CreateRenterInput = {
  birthDate: Scalars['String']['input'];
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  imageURL: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type CreateReviewInput = {
  contents: Scalars['String']['input'];
  itemId: Scalars['Int']['input'];
  rating: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};

export type Employee = {
  __typename?: 'Employee';
  birthDate: Scalars['DateTime']['output'];
  company: Company;
  companyId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  imageURL?: Maybe<Scalars['String']['output']>;
  lastName: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type FilterItemInput = {
  durationType?: InputMaybe<Scalars['String']['input']>;
  maxDuration?: InputMaybe<Scalars['Int']['input']>;
  maxPrice?: InputMaybe<Scalars['Int']['input']>;
  priceType?: InputMaybe<Scalars['String']['input']>;
};

export type Form = {
  __typename?: 'Form';
  id: Scalars['Int']['output'];
  offeringDuration: Scalars['Int']['output'];
  offeringPrice: Scalars['Float']['output'];
  renterApplication: RenterApplication;
};

export type Item = {
  __typename?: 'Item';
  category: ItemCategory;
  company: Company;
  companyId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  deposit: Scalars['Int']['output'];
  description: Scalars['String']['output'];
  fee: Scalars['Float']['output'];
  feeType: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  imageURL?: Maybe<Scalars['String']['output']>;
  maxDuration: Scalars['Int']['output'];
  maxDurationType: Scalars['String']['output'];
  name: Scalars['String']['output'];
  ownerApplication: OwnerApplication;
  renterApplications: Array<RenterApplication>;
  reviews: Array<Review>;
  stockStatus: StockStatus;
  updatedAt: Scalars['DateTime']['output'];
};

/** The item types */
export enum ItemCategory {
  /** Any furniture. */
  Furniture = 'FURNITURE',
  /** Anything related to music such as instruments, scores, etc. */
  Music = 'MUSIC',
  /** Any tools. */
  Tool = 'TOOL'
}

export type Mutation = {
  __typename?: 'Mutation';
  createCompany: Company;
  createEmployee: Employee;
  createItem: Company;
  createRenter: Renter;
  createRenterApplication: RenterApplication;
  createReview: Item;
  deleteItem: Item;
};


export type MutationCreateCompanyArgs = {
  createCompanyInput: CreateCompanyInput;
};


export type MutationCreateEmployeeArgs = {
  createEmployeeInput: CreateEmployeeInput;
};


export type MutationCreateItemArgs = {
  createItemInput: CreateItemInput;
};


export type MutationCreateRenterArgs = {
  createRenterInput: CreateRenterInput;
};


export type MutationCreateRenterApplicationArgs = {
  createRenterApplicationInput: CreateFormInput;
};


export type MutationCreateReviewArgs = {
  createReviewInput: CreateReviewInput;
};


export type MutationDeleteItemArgs = {
  itemId: Scalars['Int']['input'];
};

export type OwnerApplication = {
  __typename?: 'OwnerApplication';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  status: ApplicationStatus;
  updatedAt: Scalars['DateTime']['output'];
};

export type Query = {
  __typename?: 'Query';
  companies: Array<Company>;
  companyInfo: Company;
  employees: Array<Employee>;
  itemByCompany: Company;
  itemInfo: Item;
  items: Array<Item>;
  renterApplications: Array<RenterApplication>;
  renters: Array<Renter>;
  reviews: Array<Review>;
};


export type QueryCompanyInfoArgs = {
  companyName: Scalars['String']['input'];
};


export type QueryItemByCompanyArgs = {
  companyName: Scalars['String']['input'];
};


export type QueryItemInfoArgs = {
  itemId: Scalars['Int']['input'];
};


export type QueryItemsArgs = {
  filter?: InputMaybe<FilterItemInput>;
};

export type Renter = {
  __typename?: 'Renter';
  birthDate: Scalars['DateTime']['output'];
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  imageURL?: Maybe<Scalars['String']['output']>;
  lastName: Scalars['String']['output'];
  renterApplications: Array<RenterApplication>;
  updatedAt: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
};

export type RenterApplication = {
  __typename?: 'RenterApplication';
  createdAt: Scalars['DateTime']['output'];
  form?: Maybe<Form>;
  formId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  item?: Maybe<Item>;
  itemId: Scalars['Int']['output'];
  renter: Renter;
  renterApplicationStatuses?: Maybe<Array<RenterApplicationStatus>>;
  renterId: Scalars['Int']['output'];
};

export type RenterApplicationStatus = {
  __typename?: 'RenterApplicationStatus';
  id: Scalars['Int']['output'];
  renterApplication: RenterApplication;
  renterApplicationId: Scalars['Int']['output'];
  status: RenterApplicationStatusType;
  updatedAt: Scalars['DateTime']['output'];
};

/** Application status for a renter application */
export enum RenterApplicationStatusType {
  /** When a renter application is accepted. */
  Accepted = 'ACCEPTED',
  /** When a renter applied for an item. */
  Applied = 'APPLIED',
  /** When an item is returned to a company. */
  Completed = 'COMPLETED',
  /** When a renter application is declined. */
  Declined = 'DECLINED',
  /** When an item is delivered by a company. */
  Delivered = 'DELIVERED',
  /** When an item is arrived at a renter. */
  Rented = 'RENTED',
  /** When a renter returns an item back to a company. */
  Returned = 'RETURNED'
}

export type Review = {
  __typename?: 'Review';
  contents: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  item: Item;
  itemId: Scalars['Int']['output'];
  rating: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type StockStatus = {
  __typename?: 'StockStatus';
  currentStock: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  item: Item;
  itemId: Scalars['Int']['output'];
  totalStock: Scalars['Int']['output'];
};

export type CreateRenterApplicationMutationVariables = Exact<{
  createRenterApplicationInput: CreateFormInput;
}>;


export type CreateRenterApplicationMutation = { __typename?: 'Mutation', createRenterApplication: { __typename?: 'RenterApplication', id: number, createdAt: any, form?: { __typename?: 'Form', id: number, offeringPrice: number, offeringDuration: number } | null, renterApplicationStatuses?: Array<{ __typename?: 'RenterApplicationStatus', id: number, status: RenterApplicationStatusType, updatedAt: any }> | null, item?: { __typename?: 'Item', id: number } | null } };

export type GetAllItemsQueryVariables = Exact<{
  filter?: InputMaybe<FilterItemInput>;
}>;


export type GetAllItemsQuery = { __typename?: 'Query', items: Array<{ __typename?: 'Item', id: number, name: string, category: ItemCategory, fee: number, feeType: string, maxDuration: number, maxDurationType: string, imageURL?: string | null }> };

export type GetCompanyInfoQueryVariables = Exact<{
  companyName: Scalars['String']['input'];
}>;


export type GetCompanyInfoQuery = { __typename?: 'Query', companyInfo: { __typename?: 'Company', id: number, name: string, description: string, createdAt: any, logoURL?: string | null, items?: Array<{ __typename?: 'Item', id: number, name: string, fee: number, feeType: string, imageURL?: string | null }> | null } };

export type GetItemInfoQueryVariables = Exact<{
  itemId: Scalars['Int']['input'];
}>;


export type GetItemInfoQuery = { __typename?: 'Query', itemInfo: { __typename?: 'Item', id: number, name: string, description: string, createdAt: any, category: ItemCategory, fee: number, feeType: string, maxDuration: number, maxDurationType: string, imageURL?: string | null, deposit: number, company: { __typename?: 'Company', name: string, logoURL?: string | null, description: string }, reviews: Array<{ __typename?: 'Review', title: string, contents: string, rating: number }> } };


export const CreateRenterApplicationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateRenterApplication"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createRenterApplicationInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateFormInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createRenterApplication"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createRenterApplicationInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createRenterApplicationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"form"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"offeringPrice"}},{"kind":"Field","name":{"kind":"Name","value":"offeringDuration"}}]}},{"kind":"Field","name":{"kind":"Name","value":"renterApplicationStatuses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"item"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<CreateRenterApplicationMutation, CreateRenterApplicationMutationVariables>;
export const GetAllItemsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllItems"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"FilterItemInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"fee"}},{"kind":"Field","name":{"kind":"Name","value":"feeType"}},{"kind":"Field","name":{"kind":"Name","value":"maxDuration"}},{"kind":"Field","name":{"kind":"Name","value":"maxDurationType"}},{"kind":"Field","name":{"kind":"Name","value":"imageURL"}}]}}]}}]} as unknown as DocumentNode<GetAllItemsQuery, GetAllItemsQueryVariables>;
export const GetCompanyInfoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCompanyInfo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"companyName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"companyInfo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"companyName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companyName"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"logoURL"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"fee"}},{"kind":"Field","name":{"kind":"Name","value":"feeType"}},{"kind":"Field","name":{"kind":"Name","value":"imageURL"}}]}}]}}]}}]} as unknown as DocumentNode<GetCompanyInfoQuery, GetCompanyInfoQueryVariables>;
export const GetItemInfoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetItemInfo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"itemId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"itemInfo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"itemId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"itemId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"fee"}},{"kind":"Field","name":{"kind":"Name","value":"feeType"}},{"kind":"Field","name":{"kind":"Name","value":"maxDuration"}},{"kind":"Field","name":{"kind":"Name","value":"maxDurationType"}},{"kind":"Field","name":{"kind":"Name","value":"imageURL"}},{"kind":"Field","name":{"kind":"Name","value":"deposit"}},{"kind":"Field","name":{"kind":"Name","value":"company"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"logoURL"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"reviews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"contents"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}}]}}]}}]}}]} as unknown as DocumentNode<GetItemInfoQuery, GetItemInfoQueryVariables>;