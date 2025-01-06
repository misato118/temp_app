import { Module } from '@nestjs/common';
import { OwnerApplicationsService } from './ownerApplications.service';
import { OwnerApplicationsResolver } from './ownerApplications.resolver';
import { PrismaService } from 'src/prisma.service';
import { ConversationsModule } from 'src/conversations/conversations.module';

@Module({
  providers: [OwnerApplicationsResolver, OwnerApplicationsService, PrismaService],
  imports: [ConversationsModule],
})
export class OwnerApplicationsModule {}