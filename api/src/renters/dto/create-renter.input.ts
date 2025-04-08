import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateRenterInput {
  @Field(() => String)
  username: string;
  @Field(() => String)
  firstName: string;
  @Field(() => String)
  lastName: string;
  @Field(() => String)
  birthDate: Date;
  @Field(() => String)
  email: string;
  @Field(() => String)
  imageURL: string;
  @Field(() => String)
  password: string;
}