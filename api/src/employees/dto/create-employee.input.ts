import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateEmployeeInput {
  @Field(() => String)
  firstName: string;
  @Field(() => String)
  lastName: string;
  @Field(() => String)
  birthDate: Date;
  @Field(() => String)
  email: string;
  @Field(() => String, { description: 'The name of a company this employee works for' })
  company: string;
}
