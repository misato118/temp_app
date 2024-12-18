import { InputType, Field } from '@nestjs/graphql';
import { Employee } from 'src/employees/models/employee.model';

@InputType()
export class CreateCompanyInput {
  @Field(() => String, { description: '' })
  name: string;
  @Field(() => String, { description: '' })
  email: string;
  @Field(() => String, { description: '' })
  description: string;
}
