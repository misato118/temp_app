import { Resolver, ResolveField, Args, Query, Mutation } from '@nestjs/graphql';
import { Renter } from './models/renter.model';
import { RentersService } from './renters.service';
import { CreateRenterInput } from './dto/create-renter.input';

@Resolver(() => Renter)
export class RentersResolver {
  constructor(
    private rentersService: RentersService,
  ) {}

  @Query(() => [Renter], { name: 'renters' })
  async findAll() {
    return this.rentersService.findAll();
  }

  @Mutation(() => Renter, { name: 'createRenter' })
  createEmployee(@Args('createRenterInput') createRenterInput: CreateRenterInput) {
    return this.rentersService.create(createRenterInput);
  }
}