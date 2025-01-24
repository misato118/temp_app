import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateRenterInput } from './dto/create-renter.input';

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
}