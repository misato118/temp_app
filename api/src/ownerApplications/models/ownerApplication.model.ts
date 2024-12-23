import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Item } from 'src/items/models/item.model';

@ObjectType()
export class OwnerApplication {
  @Field(type => Int)
  id: number;

  @Field(type => ApplicationStatus)
  status: ApplicationStatus;

  @Field(type => Date)
  createdAt: Date;

  @Field(type => Date)
  updatedAt: Date;

  @Field(type => Item)
  item: Item;
  
  @Field(type => Int)
  itemId: number;
}

enum ApplicationStatus {
  APPLIED,
  DECLINED,
  ACCEPTED,
}