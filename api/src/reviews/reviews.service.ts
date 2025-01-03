import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateReviewInput } from './dto/create-review.input';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.review.findMany();
  }

  create(createReviewInput: CreateReviewInput) {
    const itemId = createReviewInput.itemId;
    const updatedInput = { ...createReviewInput, ['itemId']: undefined };

    return this.prisma.item.update({
      where: {
        id: itemId
      },
      data: {
        reviews: {
          create: {
            ...updatedInput,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        }
      },
      select: {
        reviews: true,
      }
    });
  }
}