import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Item } from 'src/items/models/item.model';

@ObjectType()
export class StockStatus {
  @Field(type => Int)
  id: number;

  @Field(type => Int)
  totalStock: number;

  @Field(type => Int)
  currentStock: number;

  @Field(type => Item)
  item: Item;

  @Field(type => Int)
  itemId: number;
}