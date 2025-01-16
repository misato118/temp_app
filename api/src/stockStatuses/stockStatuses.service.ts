import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateStockStatusInput } from './dto/create-stockStatus.input';
import { Args, Int } from '@nestjs/graphql';

@Injectable()
export class StockStatusesService {
  constructor(private prisma: PrismaService) {}

  findOneById(@Args('itemId', { type: () => Int }) itemId: number) {
    return this.prisma.stockStatus.findUnique({
      where: {
        id: itemId,
      }
    });
  }

  create(createStockStatusInput: CreateStockStatusInput) {
    const itemId = createStockStatusInput.itemId;
    const updatedInput = { ...createStockStatusInput, ['itemId']: undefined };

    return this.prisma.item.update({
      where: {
        id: itemId
      },
      data: {
        stockStatus: {
          create: {
            ...updatedInput
          },
        }
      },
    });
  }
}