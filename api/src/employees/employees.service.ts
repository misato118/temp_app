import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateEmployeeInput } from './dto/create-employee.input';

@Injectable()
export class EmployeesService {
  constructor(private prisma: PrismaService) {}

  // Obtains all employees
  findAll() {
    return this.prisma.employee.findMany({
      include: {
        company: true,
      }
    });
  }

  // Create a new employee
  create(createEmployeeInput: CreateEmployeeInput) {
    const companyName = createEmployeeInput.company;
    const updatedInput = { ...createEmployeeInput, ['company']: undefined };

    // When a company name is not provided, and 
    if (companyName == null) {
      return null;
    }

    return this.prisma.company.update({
      where: {
        name: companyName,
      },
      data: {
        employees: {
          create: {
            ...updatedInput,
            createdAt: new Date(),
            updatedAt: new Date(),
          }
        }
      }
    });    
  }
}