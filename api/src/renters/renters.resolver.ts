import { Resolver, ResolveField, Args, Query, Mutation, Int } from '@nestjs/graphql';
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

  @Query(() => Renter, { name: 'renterInfo' })
  async findOneByRenterId(@Args('renterId', { type: () => Int }) renterId: number) {
    return this.rentersService.findOneById(renterId);
  }

  @Mutation(() => Renter, { name: 'createRenter' })
  createRenter(@Args('createRenterInput') createRenterInput: CreateRenterInput) {
    return this.rentersService.create(createRenterInput);
  }
}