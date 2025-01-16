import { InputType, Field, Float, Int } from '@nestjs/graphql';

@InputType()
export class CreateFormInput {
    @Field(() => Int)
    renterId: number; 
    @Field(() => Int)
    itemId: number;    
    @Field(() => Float)
    offeringPrice: number;
    @Field(() => Int)
    offeringDuration: number;
}