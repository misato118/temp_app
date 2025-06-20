import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateEmployeeInput {
    @Field(() => String)
    firstName: string;
    @Field(() => String)
    lastName: string;
    @Field(() => Date)
    birthDate: Date;
    @Field(() => String)
    email: string;
    @Field(() => String)
    password: string;
    @Field(() => String, { description: 'The name of a company this employee works for' })
    company: string;
}