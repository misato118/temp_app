import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateFormInput } from 'src/forms/dto/create-form.input';
import { RenterApplicationStatusType } from 'src/renterApplicationStatusTypes/models/renterApplicationStatusType.model';

@Injectable()
export class RenterApplicationsService {
    constructor(private prisma: PrismaService) { }

    // Obtains renter applications
    findAll() {
        return this.prisma.renterApplication.findMany();
    }

    // Creates a new renter application
    create(createFormInput: CreateFormInput) {
        const { renterId, itemId, ...updatedInput } = createFormInput;

        // When a renter or item id is not provided
        if (renterId == null || itemId == null) {
            return null;
        }

        return this.prisma.renterApplication.create({
            data: {
                createdAt: new Date(),
                renter: {
                    connect: {
                        id: renterId
                    }
                },
                form: {
                    create: {
                        ...updatedInput
                    }
                },
                renterApplicationStatuses: {
                    create: {
                        status: RenterApplicationStatusType.APPLIED,
                        updatedAt: new Date()
                    }
                },
                item: {
                    connect: {
                        id: itemId
                    }
                }
            },
            include: {
                form: true,
                item: true,
                renter: true,
                renterApplicationStatuses: true,
            }
        });
    }

    /*
    findOneById(@Args('applicationId', { type: () => Int }) applicationId: number) {
      return this.prisma.renterApplication.findUnique({
          where: {
              id: applicationId,
          },
          include: {
              renter: true,
              form: true,
              renterApplicationStatuses: true,
              item: true
          }
      })
    }
      */
}