import { Field, Int, ObjectType } from '@nestjs/graphql';
import { RenterApplication } from 'src/renterApplications/models/renterApplication.model';

@ObjectType()
export class Renter {
  @Field(type => Int)
  id: number;

  @Field(type => String)
  username: string;

  @Field(type => String)
  firstName: string;

  @Field(type => String)
  lastName: string;

  @Field(type => Date)
  birthDate: Date;

  @Field(type => String)
  email: string;

  @Field(type => Date)
  createdAt: Date;

  @Field(type => Date)
  updatedAt: Date;

  @Field({ nullable: true })
  imageURL?: string;

  //@Field(type => [Admin])
  //admins: Admin[];

  //@Field(type => [Question])
  //questions: Question[];

  //@Field(type => [Notification])
  //notifications: Notification[];

  //@Field(type => Address)
  //address: Address;

  @Field(type => [RenterApplication])
  renterApplications: RenterApplication[];
}