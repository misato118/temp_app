import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateItemInput } from './dto/create-item.input';

@Injectable()
export class ItemsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.item.findMany();
  }

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
}