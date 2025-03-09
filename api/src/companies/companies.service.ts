import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCompanyInput } from './dto/create-company.input';
import { Args } from '@nestjs/graphql';
import { Employee } from 'src/employees/models/employee.model';

@Injectable()
export class CompaniesService {
  constructor(private prisma: PrismaService) {}

  // MODIFY HERE TO GET AN OWNER'S LIST ON TOCS SIDE: Obtain all companies
  findAll() {
    return this.prisma.company.findMany({
      include: {
        employees: true,
      }
    });
  }

  // Create a new company
  create(createCompanyInput: CreateCompanyInput) {
    return this.prisma.company.create({
      data: {
        ...createCompanyInput,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  // Find a company by name
  findOneByName(@Args('companyName', { type: () => String }) companyName: string) {
    return this.prisma.company.findFirst({
      where: {
        //name: companyName,
        name: {
          equals: companyName,
          mode: 'insensitive',
        }
      },
      include: {
        items: true,
      }
    })
  }

  // Delete a company
  /*deleteCompany(@Args('companyName', { type: () => String }) companyName: string) {
    return this,prisma.company.delete({
      where: {
        name: companyName,
      }
    });
  }*/

  // TODO: Add a function to obtain a company address after adding Addresses
  /*
  getAddress(@Args('companyName', { type: () => String }) companyName: string) {
    return this.prisma.company.findUnique({
      where: {
        name: companyName,
      },
      include: {
        address: true,
      },
      select: {
        address: true,
      }
    });
  }
  */
}