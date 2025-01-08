import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateEmployeeInput } from './dto/create-employee.input';

@Injectable()
export class EmployeesService {
  constructor(private prisma: PrismaService) {}

  // Obtains all employees
  findAll() {
    return this.prisma.employee.findMany();
  }

  // Create a new employee
  create(createEmployeeInput: CreateEmployeeInput) {
    return this.prisma.employee.create({
        data: {
            ...createEmployeeInput,
            createdAt: new Date(),
            updatedAt: new Date(),
        }
      });    
  }
}