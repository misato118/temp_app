import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateReviewInput } from './dto/create-review.input';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.review.findMany();
  }
}