import { InputType, Field } from '@nestjs/graphql';
import { Company } from 'src/companies/models/company.model';

@InputType()
export class CreateEmployeeInput {
  @Field(() => String, { description: '' })
  firstName: string;
  @Field(() => String, { description: '' })
  lastName: string;
  @Field(() => String, { description: '' })
  birthDate: Date;
  @Field(() => String, { description: '' })
  email: string;
}
