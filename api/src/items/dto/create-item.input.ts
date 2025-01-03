import { InputType, Field, Int, Float } from '@nestjs/graphql';
import { ItemCategory } from 'src/itemCategories/models/itemCategory.model';

@InputType()
export class CreateItemInput {
  @Field(() => String)
  name: string;
  @Field(() => String)
  description: string;
  @Field(() => ItemCategory)
  category: ItemCategory;
  @Field(() => Float)
  fee: number;
  @Field(() => String)
  feeType: string;
  @Field(() => Int)
  maxDuration: number;
  @Field(() => String)
  maxDurationType: string;
  @Field(() => String)
  imageURL: string;
  @Field(() => Int)
  deposit: number;
  @Field(() => String)
  company: string;
}
