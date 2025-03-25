/* eslint-disable */
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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
  form: Form;
  formId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  item: Item;
  itemId: Scalars['Int']['output'];
  renter: Renter;
  renterApplicationStatuses: Array<RenterApplicationStatus>;
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


export const GetAllItemsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllItems"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"FilterItemInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"fee"}},{"kind":"Field","name":{"kind":"Name","value":"feeType"}},{"kind":"Field","name":{"kind":"Name","value":"maxDuration"}},{"kind":"Field","name":{"kind":"Name","value":"maxDurationType"}},{"kind":"Field","name":{"kind":"Name","value":"imageURL"}}]}}]}}]} as unknown as DocumentNode<GetAllItemsQuery, GetAllItemsQueryVariables>;
export const GetCompanyInfoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCompanyInfo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"companyName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"companyInfo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"companyName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companyName"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"logoURL"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"fee"}},{"kind":"Field","name":{"kind":"Name","value":"feeType"}},{"kind":"Field","name":{"kind":"Name","value":"imageURL"}}]}}]}}]}}]} as unknown as DocumentNode<GetCompanyInfoQuery, GetCompanyInfoQueryVariables>;
export const GetItemInfoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetItemInfo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"itemId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"itemInfo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"itemId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"itemId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"fee"}},{"kind":"Field","name":{"kind":"Name","value":"feeType"}},{"kind":"Field","name":{"kind":"Name","value":"maxDuration"}},{"kind":"Field","name":{"kind":"Name","value":"maxDurationType"}},{"kind":"Field","name":{"kind":"Name","value":"imageURL"}},{"kind":"Field","name":{"kind":"Name","value":"deposit"}},{"kind":"Field","name":{"kind":"Name","value":"company"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"logoURL"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"reviews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"contents"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}}]}}]}}]}}]} as unknown as DocumentNode<GetItemInfoQuery, GetItemInfoQueryVariables>;
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
  form: Form;
  formId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  item: Item;
  itemId: Scalars['Int']['output'];
  renter: Renter;
  renterApplicationStatuses: Array<RenterApplicationStatus>;
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



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  ApplicationStatus: ApplicationStatus;
  Company: ResolverTypeWrapper<Company>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  CreateCompanyInput: CreateCompanyInput;
  CreateEmployeeInput: CreateEmployeeInput;
  CreateFormInput: CreateFormInput;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  CreateItemInput: CreateItemInput;
  CreateRenterInput: CreateRenterInput;
  CreateReviewInput: CreateReviewInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  Employee: ResolverTypeWrapper<Employee>;
  FilterItemInput: FilterItemInput;
  Form: ResolverTypeWrapper<Form>;
  Item: ResolverTypeWrapper<Item>;
  ItemCategory: ItemCategory;
  Mutation: ResolverTypeWrapper<{}>;
  OwnerApplication: ResolverTypeWrapper<OwnerApplication>;
  Query: ResolverTypeWrapper<{}>;
  Renter: ResolverTypeWrapper<Renter>;
  RenterApplication: ResolverTypeWrapper<RenterApplication>;
  RenterApplicationStatus: ResolverTypeWrapper<RenterApplicationStatus>;
  RenterApplicationStatusType: RenterApplicationStatusType;
  Review: ResolverTypeWrapper<Review>;
  StockStatus: ResolverTypeWrapper<StockStatus>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Company: Company;
  String: Scalars['String']['output'];
  Int: Scalars['Int']['output'];
  CreateCompanyInput: CreateCompanyInput;
  CreateEmployeeInput: CreateEmployeeInput;
  CreateFormInput: CreateFormInput;
  Float: Scalars['Float']['output'];
  CreateItemInput: CreateItemInput;
  CreateRenterInput: CreateRenterInput;
  CreateReviewInput: CreateReviewInput;
  DateTime: Scalars['DateTime']['output'];
  Employee: Employee;
  FilterItemInput: FilterItemInput;
  Form: Form;
  Item: Item;
  Mutation: {};
  OwnerApplication: OwnerApplication;
  Query: {};
  Renter: Renter;
  RenterApplication: RenterApplication;
  RenterApplicationStatus: RenterApplicationStatus;
  Review: Review;
  StockStatus: StockStatus;
  Boolean: Scalars['Boolean']['output'];
};

export type CompanyResolvers<ContextType = any, ParentType extends ResolversParentTypes['Company'] = ResolversParentTypes['Company']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  employees?: Resolver<Maybe<Array<ResolversTypes['Employee']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  items?: Resolver<Maybe<Array<ResolversTypes['Item']>>, ParentType, ContextType>;
  logoURL?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type EmployeeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Employee'] = ResolversParentTypes['Employee']> = {
  birthDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  company?: Resolver<ResolversTypes['Company'], ParentType, ContextType>;
  companyId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  imageURL?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FormResolvers<ContextType = any, ParentType extends ResolversParentTypes['Form'] = ResolversParentTypes['Form']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  offeringDuration?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  offeringPrice?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  renterApplication?: Resolver<ResolversTypes['RenterApplication'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['Item'] = ResolversParentTypes['Item']> = {
  category?: Resolver<ResolversTypes['ItemCategory'], ParentType, ContextType>;
  company?: Resolver<ResolversTypes['Company'], ParentType, ContextType>;
  companyId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  deposit?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  fee?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  feeType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  imageURL?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  maxDuration?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  maxDurationType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ownerApplication?: Resolver<ResolversTypes['OwnerApplication'], ParentType, ContextType>;
  renterApplications?: Resolver<Array<ResolversTypes['RenterApplication']>, ParentType, ContextType>;
  reviews?: Resolver<Array<ResolversTypes['Review']>, ParentType, ContextType>;
  stockStatus?: Resolver<ResolversTypes['StockStatus'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createCompany?: Resolver<ResolversTypes['Company'], ParentType, ContextType, RequireFields<MutationCreateCompanyArgs, 'createCompanyInput'>>;
  createEmployee?: Resolver<ResolversTypes['Employee'], ParentType, ContextType, RequireFields<MutationCreateEmployeeArgs, 'createEmployeeInput'>>;
  createItem?: Resolver<ResolversTypes['Company'], ParentType, ContextType, RequireFields<MutationCreateItemArgs, 'createItemInput'>>;
  createRenter?: Resolver<ResolversTypes['Renter'], ParentType, ContextType, RequireFields<MutationCreateRenterArgs, 'createRenterInput'>>;
  createRenterApplication?: Resolver<ResolversTypes['RenterApplication'], ParentType, ContextType, RequireFields<MutationCreateRenterApplicationArgs, 'createRenterApplicationInput'>>;
  createReview?: Resolver<ResolversTypes['Item'], ParentType, ContextType, RequireFields<MutationCreateReviewArgs, 'createReviewInput'>>;
  deleteItem?: Resolver<ResolversTypes['Item'], ParentType, ContextType, RequireFields<MutationDeleteItemArgs, 'itemId'>>;
};

export type OwnerApplicationResolvers<ContextType = any, ParentType extends ResolversParentTypes['OwnerApplication'] = ResolversParentTypes['OwnerApplication']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['ApplicationStatus'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  companies?: Resolver<Array<ResolversTypes['Company']>, ParentType, ContextType>;
  companyInfo?: Resolver<ResolversTypes['Company'], ParentType, ContextType, RequireFields<QueryCompanyInfoArgs, 'companyName'>>;
  employees?: Resolver<Array<ResolversTypes['Employee']>, ParentType, ContextType>;
  itemByCompany?: Resolver<ResolversTypes['Company'], ParentType, ContextType, RequireFields<QueryItemByCompanyArgs, 'companyName'>>;
  itemInfo?: Resolver<ResolversTypes['Item'], ParentType, ContextType, RequireFields<QueryItemInfoArgs, 'itemId'>>;
  items?: Resolver<Array<ResolversTypes['Item']>, ParentType, ContextType, Partial<QueryItemsArgs>>;
  renterApplications?: Resolver<Array<ResolversTypes['RenterApplication']>, ParentType, ContextType>;
  renters?: Resolver<Array<ResolversTypes['Renter']>, ParentType, ContextType>;
  reviews?: Resolver<Array<ResolversTypes['Review']>, ParentType, ContextType>;
};

export type RenterResolvers<ContextType = any, ParentType extends ResolversParentTypes['Renter'] = ResolversParentTypes['Renter']> = {
  birthDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  imageURL?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  renterApplications?: Resolver<Array<ResolversTypes['RenterApplication']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RenterApplicationResolvers<ContextType = any, ParentType extends ResolversParentTypes['RenterApplication'] = ResolversParentTypes['RenterApplication']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  form?: Resolver<ResolversTypes['Form'], ParentType, ContextType>;
  formId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  item?: Resolver<ResolversTypes['Item'], ParentType, ContextType>;
  itemId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  renter?: Resolver<ResolversTypes['Renter'], ParentType, ContextType>;
  renterApplicationStatuses?: Resolver<Array<ResolversTypes['RenterApplicationStatus']>, ParentType, ContextType>;
  renterId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RenterApplicationStatusResolvers<ContextType = any, ParentType extends ResolversParentTypes['RenterApplicationStatus'] = ResolversParentTypes['RenterApplicationStatus']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  renterApplication?: Resolver<ResolversTypes['RenterApplication'], ParentType, ContextType>;
  renterApplicationId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['RenterApplicationStatusType'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReviewResolvers<ContextType = any, ParentType extends ResolversParentTypes['Review'] = ResolversParentTypes['Review']> = {
  contents?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  item?: Resolver<ResolversTypes['Item'], ParentType, ContextType>;
  itemId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  rating?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StockStatusResolvers<ContextType = any, ParentType extends ResolversParentTypes['StockStatus'] = ResolversParentTypes['StockStatus']> = {
  currentStock?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  item?: Resolver<ResolversTypes['Item'], ParentType, ContextType>;
  itemId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalStock?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Company?: CompanyResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Employee?: EmployeeResolvers<ContextType>;
  Form?: FormResolvers<ContextType>;
  Item?: ItemResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  OwnerApplication?: OwnerApplicationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Renter?: RenterResolvers<ContextType>;
  RenterApplication?: RenterApplicationResolvers<ContextType>;
  RenterApplicationStatus?: RenterApplicationStatusResolvers<ContextType>;
  Review?: ReviewResolvers<ContextType>;
  StockStatus?: StockStatusResolvers<ContextType>;
};

