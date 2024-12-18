import { Resolver, ResolveField, Args, Query } from '@nestjs/graphql';
import { Company } from './models/company.model';
import { CompaniesService } from './companies.service';
import { CreateCompanyInput } from './dto/create-company.input';

@Resolver(() => Company)
export class CompaniesResolver {
  constructor(
    private companiesService: CompaniesService,
  ) {}

  @Query(() => [Company], { name: 'company' })
  async findAll() {
    return this.companiesService.findAll();
  }
}