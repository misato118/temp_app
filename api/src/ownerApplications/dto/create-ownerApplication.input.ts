import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateOwnerApplicationInput {
  @Field(() => String)
  status: string;
}
