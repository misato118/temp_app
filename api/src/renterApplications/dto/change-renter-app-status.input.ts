import { InputType, Field, Int } from '@nestjs/graphql';
import { RenterApplicationStatusType } from 'src/renterApplicationStatusTypes/models/renterApplicationStatusType.model';

@InputType()
export class ChangeRenterAppStatusInput {
    @Field(() => Int)
    id: number; // RenterApplication id
    @Field(() => RenterApplicationStatusType)
    status: RenterApplicationStatusType;
}