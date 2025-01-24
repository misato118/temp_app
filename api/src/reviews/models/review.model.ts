import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Item } from 'src/items/models/item.model';

@ObjectType()
export class Review {
  @Field(type => Int)
  id: number;

  @Field(type => String)
  title: string;

  @Field(type => String)
  contents: string;

  @Field(type => Int)
  rating: number;

  @Field(type => Date)
  createdAt: Date;

  @Field(type => Date)
  updatedAt: Date;

  @Field(type => Item)
  item: Item;

  @Field(type => Int)
  itemId: number;
}