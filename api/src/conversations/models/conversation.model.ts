import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Item } from 'src/items/models/item.model';

@ObjectType()
export class Conversation {
  @Field(type => Int)
  id: number;

  @Field(type => Item)
  item: Item;

  @Field(type => Int)
  itemId: number;

  // TODO: Uncomment this after adding Questions
  //@Field(type => [Question], { nullable: true })
  //questions: Question[];

  // TODO: Uncomment this after adding Answers
  //@Field(type => [Answer], { nullable: true })
  //answers: Answer[];
}