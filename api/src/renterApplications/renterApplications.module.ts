import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { RenterApplicationsResolver } from './renterApplications.resolver';
import { RenterApplicationsService } from './renterApplications.service';

@Module({
  providers: [RenterApplicationsResolver, RenterApplicationsService, PrismaService],
})
export class RenterApplicationsModule {}