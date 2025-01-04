import { InputType, Field, Int } from '@nestjs/graphql';
import { Decimal } from '@prisma/client/runtime/library';

@InputType()
export class CreateItemInput {
  @Field(() => String)
  name: string;
  @Field(() => String)
  description: string;
  @Field(() => String)
  category: string;
  @Field(() => Decimal)
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
}
