import { Field, Int, ObjectType } from '@nestjs/graphql';
import { RenterApplicationStatusType } from 'src/renterApplicationStatusTypes/models/renterApplicationStatusType.model';
import { RenterApplication } from 'src/renterApplications/models/renterApplication.model';

@ObjectType()
export class RenterApplicationStatus {
  @Field(type => Int)
  id: number;

  @Field(type => RenterApplicationStatusType)
  status: RenterApplicationStatusType;

  @Field(type => Date)
  updatedAt: Date;

  @Field(type => RenterApplication)
  renterApplication: RenterApplication;

  @Field(type => Int)
  renterApplicationId: number;
}