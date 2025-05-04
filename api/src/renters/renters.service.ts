import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateRenterInput } from './dto/create-renter.input';
import { Args, Int } from '@nestjs/graphql';
import { LoginRenterInput } from './dto/login-renter.input';

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
            renterApplications: {
                include: {
                    form: {
                        select: {
                            id: true,
                            offeringPrice: true,
                            offeringDuration: true
                        }
                    },
                    renterApplicationStatuses: {
                        select: {
                            id: true,
                            status: true,
                            updatedAt: true
                        }
                    },
                    item: {
                        select: {
                            id: true,
                            name: true,
                            fee: true,
                            feeType: true,
                            maxDuration: true,
                            maxDurationType: true,
                            company: {
                                select: {
                                    name: true
                                }
                            }
                        }
                    }
                }
            }
        }
    })
  }

  // Find a renter ID when logging in
  findRenterId(loginRenterInput: LoginRenterInput) {
    return this.prisma.renter.findUnique({
        where: {
            username: loginRenterInput.username,
            password: loginRenterInput.password
        },
        select: {
            id: true
        }
    })
  }
}