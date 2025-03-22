import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { RenterApplication } from './models/renterApplication.model';
import { RenterApplicationsService } from './renterApplications.service';
import { CreateFormInput } from 'src/forms/dto/create-form.input';

@Resolver(() => RenterApplication)
export class RenterApplicationsResolver {
  constructor(
    private renterApplicationsService: RenterApplicationsService,
  ) {}

  @Query(() => [RenterApplication], { name: 'renterApplications' })
  async findAll() {
    return this.renterApplicationsService.findAll();
  }

  @Mutation(() => RenterApplication, { name: 'createRenterApplication' })
  createRenterApplication(@Args('createRenterApplicationInput') createFormInput: CreateFormInput) {
    return this.renterApplicationsService.create(createFormInput);
  }
}