import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateEmployeeInput } from './dto/create-employee.input';

@Injectable()
export class EmployeesService {
  constructor(private prisma: PrismaService) {}

  // Obtains all companies
  findAll() {
    return this.prisma.employee.findMany();
  }

  // Creates a new employee and update Company's employees scalar
  create(createEmployeeInput: CreateEmployeeInput) {
    const companyName = createEmployeeInput.company;
    const updatedInput = { ...createEmployeeInput, ['company']: undefined };

    return this.prisma.company.update({
      where: {
        name: companyName
      },
      data: {
        employees: {
          create: {
            ...updatedInput,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        }
      }
    });
  }
}