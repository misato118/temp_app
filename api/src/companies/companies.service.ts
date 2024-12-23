import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCompanyInput } from './dto/create-company.input';

@Injectable()
export class CompaniesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.company.findMany();
  }

  create(createCompanyInput: CreateCompanyInput) {
    return this.prisma.company.create({
      data: {
        ...createCompanyInput,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }
}