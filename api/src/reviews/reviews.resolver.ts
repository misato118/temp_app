import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { Review } from './models/review.model';
import { Item } from 'src/items/models/item.model';
import { ReviewsService } from './reviews.service';
import { CreateReviewInput } from './dto/create-review.input';

@Resolver(() => Review)
export class ReviewsResolver {
  constructor(
    private reviewsService: ReviewsService,
  ) {}

  @Query(() => [Review], { name: 'review' })
  async findAll() {
    return this.reviewsService.findAll();
  }

  // TODO: Return a created review within the Item model
  @Mutation(() => Item, { name: 'createReview' })
  createReview(@Args('createReviewInput') createReviewInput: CreateReviewInput) {
    return this.reviewsService.create(createReviewInput);
  }
}