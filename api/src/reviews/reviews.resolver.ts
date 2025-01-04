import { Resolver, Args, Query } from '@nestjs/graphql';
import { Review } from './models/review.model';
import { ReviewsService } from './reviews.service';
import { CreateReviewInput } from './dto/create-review.input';

@Resolver(() => Review)
export class ReviewsResolver {
  constructor(
    private ReviewsService: ReviewsService,
  ) {}

  @Query(() => [Review], { name: 'review' })
  async findAll() {
    return this.ReviewsService.findAll();
  }
}