import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ApplicationStatus } from 'src/applicationStatus/models/applicationStatus.model';

@ObjectType()
export class OwnerApplication {
    @Field(type => Int)
    id: number;

    @Field(type => ApplicationStatus)
    status: ApplicationStatus;

    @Field(type => Date)
    createdAt: Date;
  
    @Field(type => Date)
    updatedAt: Date;
}