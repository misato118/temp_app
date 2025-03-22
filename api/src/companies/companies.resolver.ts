import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { Company } from './models/company.model';
import { CompaniesService } from './companies.service';
import { CreateCompanyInput } from './dto/create-company.input';

@Resolver(() => Company)
export class CompaniesResolver {
  constructor(
    private companiesService: CompaniesService,
  ) {}

  @Query(() => [Company], { name: 'companies' })
  async findAll() {
    return this.companiesService.findAll();
  }

  @Query(() => Company, { name: 'companyInfo' })
  async findOneByCompanyName(@Args('companyName', { type: () => String }) companyName: string) {
    return this.companiesService.findOneByName(companyName);
  }

  @Mutation(() => Company, { name: 'createCompany' })
  createCompany(@Args('createCompanyInput') createCompanyInput: CreateCompanyInput) {
    return this.companiesService.create(createCompanyInput);
  }
}