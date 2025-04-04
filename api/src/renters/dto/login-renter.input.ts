import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class LoginRenterInput {
    @Field(() => String)
    username: string;
    @Field(() => String)
    password: string;
}