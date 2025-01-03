import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateStockStatusInput {
  @Field(type => Int)
  totalStock: number;
  @Field(type => Int)
  currentStock: number;
  @Field(type => Int)
  itemId: number;
}
