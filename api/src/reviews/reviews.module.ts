import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsResolver } from './reviews.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [ReviewsResolver, ReviewsService, PrismaService],
})
export class ReviewsModule {}