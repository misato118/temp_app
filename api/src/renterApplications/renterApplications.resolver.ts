import { Resolver, Args, Query, Mutation, Int } from '@nestjs/graphql';
import { RenterApplication } from './models/renterApplication.model';
import { RenterApplicationsService } from './renterApplications.service';
import { CreateFormInput } from 'src/forms/dto/create-form.input';

@Resolver(() => RenterApplication)
export class RenterApplicationsResolver {
    constructor(
        private renterApplicationsService: RenterApplicationsService,
    ) { }

    @Query(() => [RenterApplication], { name: 'renterApplications' })
    async findAll() {
        return this.renterApplicationsService.findAll();
    }

    /*
    @Query(() => RenterApplication, { name: 'renterApplicationInfo' })
    async findOneByRenterApplicationId(@Args('applicationId', { type: () => Int }) applicationId: number) {
      return this.renterApplicationsService.findOneById(applicationId);
    }
    */

    @Mutation(() => RenterApplication, { name: 'createRenterApplication' })
    createRenterApplication(@Args('createRenterApplicationInput') createFormInput: CreateFormInput) {
        return this.renterApplicationsService.create(createFormInput);
    }

    @Mutation(() => Int, { name: 'deleteRenterApplications' })
    async deleteRenterApplications(@Args('itemId', { type: () => Int }) itemId: number) {
        const result = await this.renterApplicationsService.deleteMany(itemId);
        return result.count;
    }    
}