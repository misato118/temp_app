import { Module } from '@nestjs/common';
import { RentersService } from './renters.service';
import { RentersResolver } from './renters.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [RentersResolver, RentersService, PrismaService],
})
export class RentersModule {}