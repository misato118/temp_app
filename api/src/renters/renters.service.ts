import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateRenterInput } from './dto/create-renter.input';
import { Args, Int } from '@nestjs/graphql';

@Injectable()
export class RentersService {
  constructor(private prisma: PrismaService) {}

  // Obtains all renters
  findAll() {
    return this.prisma.renter.findMany();
  }

  // Creates a new renter
  create(createRenterInput: CreateRenterInput) {
    return this.prisma.renter.create({
        data: {
            ...createRenterInput,
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    })
  }

  // Obatin a renter
  findOneById(@Args('renterId', { type: () => Int }) renterId: number) {
    return this.prisma.renter.findUnique({
        where: {
            id: renterId,
        },
        include: {
            renterApplications: true,
        }
    })
  }
}