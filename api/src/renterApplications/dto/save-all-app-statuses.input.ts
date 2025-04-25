import { InputType, Field } from '@nestjs/graphql';
import { ChangeRenterAppStatusInput } from './change-renter-app-status.input';

@InputType()
export class SaveAllRenterAppStatusesInput {
    @Field(() => [ChangeRenterAppStatusInput])
    appStatusArr: ChangeRenterAppStatusInput[];
}