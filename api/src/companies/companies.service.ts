import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCompanyInput } from './dto/create-company.input';
import { Args } from '@nestjs/graphql';

@Injectable()
export class CompaniesService {
  constructor(private prisma: PrismaService) {}

  // Obtain all companies
  findAll() {
    return this.prisma.company.findMany();
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
    return this.prisma.company.findUnique({
      where: {
        name: companyName,
      }
    })
  }

  // TODO: Add a function to obtain a company address after adding Addresses

  // TODO: Add a function to obtain companies with optional filters
}