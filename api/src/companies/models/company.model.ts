import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Employee } from 'src/employees/models/employee.model';

@ObjectType()
export class Company {
  @Field(type => Int)
  id: number;

  @Field(type => String)
  name: string;

  @Field(type => String)
  email: string;

  @Field(type => String)
  description: string;

  @Field(type => Date)
  createdAt: Date;

  @Field(type => Date)
  updatedAt: Date;

  @Field({ nullable: true })
  logoURL?: string;

  @Field(type => [Employee], { nullable: true })
  employees: Employee[];
}