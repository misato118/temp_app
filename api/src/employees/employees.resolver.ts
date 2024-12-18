import { Resolver, ResolveField, Args, Query } from '@nestjs/graphql';
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
}