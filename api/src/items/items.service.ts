import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateItemInput } from './dto/create-item.input';
import { Args, Int } from '@nestjs/graphql';
import { ApplicationStatus } from 'src/applicationStatus/models/applicationStatus.model';

@Injectable()
export class ItemsService {
  constructor(private prisma: PrismaService) {}

  // Obtain all items
  findAll() {
    return this.prisma.item.findMany();
  }

  // Create a new item
  create(createItemInput: CreateItemInput) {
    const companyName = createItemInput.company;
    const updatedInput = { ...createItemInput, ['company']: undefined };

    return this.prisma.company.update({
      where: {
        name: companyName
      },
      data: {
        items: {
          create: {
            ...updatedInput,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        }
      },
    });
  }

  // Update an existing item
  update(createItemInput: CreateItemInput) {
    const itemId = createItemInput.id;
    const updatedInput = { ...createItemInput, ['company']: undefined, ['id']: undefined };

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

  // Submit an item
  submit(createItemInput: CreateItemInput) {
    if (this.hasNullFields(createItemInput)) { // Some fields are null
      // TODO: What should I return if I want to let users know that they must fill up all the fields?
      return null;
    }

    return this.create(createItemInput);
  }

  // TODO: Add a function to conduct a category search

  // TODO: Add a function to conduct a filter search

  // TODO: Add a function to sort by category/review/posted date

  // Obtain an item
  findOneById(@Args('itemId', { type: () => Int }) itemId: number) {
    return this.prisma.item.findUnique({
      where: {
        id: itemId,
      }
    })
  }

  hasNullFields(createItemInput: CreateItemInput) {
    for (var field in createItemInput) {
      if (field == null) {
        return true;
      }
    }
    return false;
  }
}