import { Resolver, ResolveField, Args, Query, Mutation } from '@nestjs/graphql';
import { OwnerApplication } from './models/ownerApplication.model';
import { OwnerApplicationsService } from './ownerApplications.service';
import { CreateOwnerApplicationInput } from './dto/create-ownerApplication.input';

@Resolver(() => OwnerApplication)
export class OwnerApplicationsResolver {
  constructor(
    private ownerApplicationsService: OwnerApplicationsService,
  ) {}

  @Query(() => [OwnerApplication], { name: 'ownerApplication' })
  async findAll() {
    return this.ownerApplicationsService.findAll();
  }
}