import { Field, Int, ObjectType, Float } from '@nestjs/graphql';
import { RenterApplication } from 'src/renterApplications/models/renterApplication.model';

@ObjectType()
export class Form {
  @Field(type => Int)
  id: number;

  @Field(type => Float)
  offeringPrice: number;

  @Field(type => Int)
  offeringDuration: number;

  @Field(type => RenterApplication)
  renterApplication: RenterApplication;
}