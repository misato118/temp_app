import { Resolver, Args, Query, Mutation, Int } from '@nestjs/graphql';
import { OwnerApplication } from './models/ownerApplication.model';
import { OwnerApplicationsService } from './ownerApplications.service';
import { ApplicationStatus } from 'src/applicationStatus/models/applicationStatus.model';

@Resolver(() => OwnerApplication)
export class OwnerApplicationsResolver {
  constructor(
    private ownerApplicationsService: OwnerApplicationsService,
  ) {}

  @Query(() => OwnerApplication, { name: 'ownerApplication' })
  async findOneById(@Args('itemId', { type: () => Int }) itemId: number) {
    return this.ownerApplicationsService.findOneById(itemId);
  }

  @Mutation(() => OwnerApplication, { name: 'updateOwnerApplication' })
  updateOwnerApplication(@Args('applicationId', { type: () => Int }) applicationId: number, @Args('newStatus', { type: () => ApplicationStatus }) newStatus: ApplicationStatus) {
    return this.ownerApplicationsService.updateStatus(applicationId, newStatus);
  }
}