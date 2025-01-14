import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Company } from 'src/companies/models/company.model';
import { ItemCategory } from 'src/itemCategories/models/itemCategory.model';
//import { Review } from 'src/reviews/models/review.model';
//import { StockStatus } from 'src/stockStatuses/models/stockStatus.model';
//import { OwnerApplication } from 'src/ownerApplications/models/ownerApplication.model';
//import { Conversation } from 'src/conversations/models/conversation.model';

@ObjectType()
export class Item {
  @Field(type => Int)
  id: number;

  @Field(type => String)
  name: string;

  @Field(type => String)
  description: string;

  @Field(type => Date)
  createdAt: Date;

  @Field(type => Date)
  updatedAt: Date;

  @Field(type => ItemCategory)
  category: ItemCategory;

  @Field(type => Float)
  fee: number;

  @Field(type => String)
  feeType: string;

  @Field(type => Int)
  maxDuration: number;

  @Field(type => String)
  maxDurationType: string;

  @Field({ nullable: true })
  imageURL?: string;

  @Field(type => Int)
  deposit: number;

  //@Field(type => Decimal, { nullable: true })
  //overallReview?: number;

  @Field(type => Company)
  company: Company;

  @Field(type => Int)
  companyId: number;

  //@Field(type => [Review])
  //reviews: Review[];

  //@Field(type => OwnerApplication)
  //ownerApplication: OwnerApplication;

  //@Field(type => StockStatus)
  //stockStatus: StockStatus;

  //@Field(type => Conversation)
  //conversations: Conversation;
}