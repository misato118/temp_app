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
  DateTime: { input: Date; output: Date; }
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
  password: Scalars['String']['input'];
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
  birthDate?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  imageURL?: InputMaybe<Scalars['String']['input']>;
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
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
  password: Scalars['String']['output'];
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

export type LoginEmployeeInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type LoginRenterInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

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
  employeeId: Employee;
  employees: Array<Employee>;
  itemByCompany: Company;
  itemInfo: Item;
  items: Array<Item>;
  renterApplications: Array<RenterApplication>;
  renterId: Renter;
  renterInfo: Renter;
  renters: Array<Renter>;
  reviews: Array<Review>;
};


export type QueryCompanyInfoArgs = {
  companyName: Scalars['String']['input'];
};


export type QueryEmployeeIdArgs = {
  loginEmployeeInput: LoginEmployeeInput;
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


export type QueryRenterIdArgs = {
  loginRenterInput: LoginRenterInput;
};


export type QueryRenterInfoArgs = {
  renterId: Scalars['Int']['input'];
};

export type Renter = {
  __typename?: 'Renter';
  birthDate?: Maybe<Scalars['DateTime']['output']>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  imageURL?: Maybe<Scalars['String']['output']>;
  lastName: Scalars['String']['output'];
  password: Scalars['String']['output'];
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

export type GetEmployeeIdQueryVariables = Exact<{
  loginEmployeeInput: LoginEmployeeInput;
}>;


export type GetEmployeeIdQuery = { __typename?: 'Query', employeeId: { __typename?: 'Employee', id: number, company: { __typename?: 'Company', id: number, name: string } } };


export const GetEmployeeIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEmployeeId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"loginEmployeeInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginEmployeeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"employeeId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"loginEmployeeInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"loginEmployeeInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"company"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetEmployeeIdQuery, GetEmployeeIdQueryVariables>;