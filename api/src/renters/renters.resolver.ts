import { Resolver, Args, Query, Mutation, Int } from '@nestjs/graphql';
import { Renter } from './models/renter.model';
import { RentersService } from './renters.service';
import { CreateRenterInput } from './dto/create-renter.input';
import { LoginRenterInput } from './dto/login-renter.input';

@Resolver(() => Renter)
export class RentersResolver {
    constructor(
        private rentersService: RentersService,
    ) { }

    @Query(() => [Renter], { name: 'renters' })
    async findAll() {
        return this.rentersService.findAll();
    }

    @Query(() => Renter, { name: 'renterInfo' })
    async findOneByRenterId(@Args('renterId', { type: () => Int }) renterId: number) {
        return this.rentersService.findOneById(renterId);
    }

    @Query(() => Renter, { name: 'renterId' })
    async findRenterId(@Args('loginRenterInput') loginRenterInput: LoginRenterInput) {
        return this.rentersService.findRenterId(loginRenterInput);
    }

    @Mutation(() => Renter, { name: 'createRenter' })
    createRenter(@Args('createRenterInput') createRenterInput: CreateRenterInput) {
        return this.rentersService.create(createRenterInput);
    }
}