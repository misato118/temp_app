import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ItemCategory {
  @Field(type => Int)
  id: number;

  @Field(type => Category)
  name: Category;
}

enum Category {
  FURNITURE,
  MUSIC,
  TOOL,
}