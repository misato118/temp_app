import { Module } from '@nestjs/common';
import { OwnerApplicationsService } from './ownerApplications.service';
import { OwnerApplicationsResolver } from './ownerApplications.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [OwnerApplicationsResolver, OwnerApplicationsService, PrismaService],
})
export class OwnerApplicationsModule {}