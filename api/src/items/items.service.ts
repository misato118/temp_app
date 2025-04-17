import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateItemInput } from './dto/create-item.input';
import { Args, Int } from '@nestjs/graphql';
import { ApplicationStatus } from 'src/applicationStatus/models/applicationStatus.model';
import { FilterItemInput } from './dto/filter-item.input';

@Injectable()
export class ItemsService {
  constructor(private prisma: PrismaService) {}

  // Obtain all items
  findAll(filter?: FilterItemInput) {
    return this.prisma.item.findMany({
      where: {
        maxDuration: filter?.maxDuration
          ? {
              lte: filter?.maxDuration,
            }
          : undefined,
        fee: filter?.maxPrice
          ? {
              lte: filter?.maxPrice,
            }
          : undefined,
        feeType: filter?.priceType
          ? { contains: filter?.priceType }
          : undefined,
        maxDurationType: filter?.durationType
          ? { contains: filter?.durationType }
          : undefined,
      },
    });
  }

  // Obtain all items by a company name
  findAllByCompany(
    @Args('companyName', { type: () => String }) companyName: string,
  ) {
    return this.prisma.company.findUnique({
      where: {
        name: companyName,
      },
      include: {
        items: {
          include: {
            ownerApplication: true,
            stockStatus: true,
            renterApplications: {
              include: {
                renter: true,
                renterApplicationStatuses: true,
              },
            },
          },
        },
      },
    });
  }

  // Create a new item
  create(createItemInput: CreateItemInput) {
    const companyName = createItemInput.company;
    const updatedInput = { ...createItemInput, ['company']: undefined };

    return this.prisma.company.update({
      where: {
        name: companyName,
      },
      data: {
        items: {
          create: {
            ...updatedInput,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
      },
    });
  }

  // Update an existing item
  update(createItemInput: CreateItemInput) {
    const itemId = createItemInput.id;
    const updatedInput = {
      ...createItemInput,
      ['company']: undefined,
      ['id']: undefined,
    };

    return this.prisma.item.update({
      where: {
        id: itemId,
      },
      data: {
        ...updatedInput,
        updatedAt: new Date(),
      },
    });
  }

  // Submit an item by creating an owner application
  submit(createItemInput: CreateItemInput) {
    const itemId = createItemInput.id;

    return this.prisma.item.update({
      where: {
        id: itemId,
      },
      data: {
        ownerApplication: {
          create: {
            status: ApplicationStatus.PENDING,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
      },
    });
  }

  // Delete an item
  delete(@Args('itemId', { type: () => Int }) itemId: number) {
    return this.prisma.item.delete({
      where: {
        id: itemId,
      },
    });
  }

  // TODO: Add a function to conduct a category search

  // TODO: Add a function to conduct a filter search

  // TODO: Add a function to sort by category/review/posted date

  // Obtain an item
  findOneById(@Args('itemId', { type: () => Int }) itemId: number) {
    return this.prisma.item.findUnique({
      where: {
        id: itemId,
      },
      include: {
        company: true,
        reviews: true,
      },
    });
  }
}
