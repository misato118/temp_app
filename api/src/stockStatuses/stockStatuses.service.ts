import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
//import { CreateStockStatusInput } from './dto/create-stockStatus.input';

@Injectable()
export class StockStatusesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.stockStatus.findMany();
  }
}