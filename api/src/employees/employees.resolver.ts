import { Resolver, ResolveField, Args, Query, Mutation } from '@nestjs/graphql';
import { Employee } from './models/employee.model';
import { EmployeesService } from './employees.service';
import { CreateEmployeeInput } from './dto/create-employee.input';

@Resolver(() => Employee)
export class EmployeesResolver {
  constructor(
    private employeesService: EmployeesService,
  ) {}

  @Query(() => [Employee], { name: 'employee' })
  async findAll() {
    return this.employeesService.findAll();
  }

  @Mutation(() => Employee, { name: 'createEmployee' })
  createEmployee(@Args('createEmployeeInput') createEmployeeInput: CreateEmployeeInput) {
    return this.employeesService.create(createEmployeeInput);
  }
}