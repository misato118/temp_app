import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class FilterItemInput {
  @Field(() => String, { nullable: true })
  priceType: string;
  @Field(() => Int, { nullable: true })
  maxPrice: number;
  @Field(() => String, { nullable: true })
  durationType: string;
  @Field(() => Int, { nullable: true })
  maxDuration: number;
}
