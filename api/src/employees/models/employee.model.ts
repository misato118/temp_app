import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Employee {
  @Field(type => Int)
  id: number;

  @Field(type => String)
  firstName: string;

  @Field(type => String)
  lastName: string;

  @Field(type => Date)
  birthDate: Date;

  @Field(type => String)
  email: string;

  @Field(type => Date)
  createdAt: Date;

  @Field(type => Date)
  updatedAt: Date;

  @Field({ nullable: true })
  imageURL?: string;

  @Field(type => String)
  company: string;

  @Field(type => Int)
  companyId: number;

  //@Field({ nullable: true })
  //answers: Answer[];
}