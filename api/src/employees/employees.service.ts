import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateEmployeeInput } from './dto/create-employee.input';
import { LoginEmployeeInput } from './dto/login-employee.input';
import { Args, Int } from '@nestjs/graphql';

@Injectable()
export class EmployeesService {
    constructor(private prisma: PrismaService) { }

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

    findOneById(@Args('employeeId', { type: () => Int }) employeeId: number) {
        return this.prisma.employee.findUnique({
            where: {
                id: employeeId,
            },
            include: {
                company: {
                    include: {
                        items: {
                            include: {
                                ownerApplication: true,
                                stockStatus: true,
                            }
                        }
                    }
                }
            }
        })
    }

    // Find a renter ID when logging in
    findEmployeeId(loginEmployeeInput: LoginEmployeeInput) {
        return this.prisma.employee.findUnique({
            where: {
                email: loginEmployeeInput.username,
                password: loginEmployeeInput.password
            },
            include: {
                company: true
            }
        })
    }
}