import { Module } from '@nestjs/common';
import { StockStatusesService } from './stockStatuses.service';
import { StockStatusesResolver } from './stockStatuses.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [StockStatusesResolver, StockStatusesService, PrismaService],
})
export class StockStatusesModule {}