import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateEmployeeInput } from './dto/create-employee.input';

@Injectable()
export class EmployeesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.employee.findMany();
  }

  create(createEmployeeInput: CreateEmployeeInput) {
    return this.prisma.employee.create({
      data: {
        ...createEmployeeInput,
        createdAt: new Date(),
        updatedAt: new Date(),
        company: undefined,
        companyId: 1
      },
    });
  }
}