import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateReviewInput {
  @Field(() => String)
  title: string;
  @Field(() => String)
  contents: string;
  @Field(() => Int)
  rating: number;
  @Field(() => Int)
  itemId: number;
}