import { Resolver, Args, Query, Mutation, Int } from '@nestjs/graphql';
import { Conversation } from './models/conversation.model';
import { ConversationsService } from './conversations.service';

@Resolver(() => Conversation)
export class ConversationsResolver {
  constructor(
    private conversationsService: ConversationsService,
  ) {}

  @Query(() => Conversation, { name: 'conversation' })
  async findAll(@Args('itemId', { type: () => Int }) itemId: number) {
    return this.conversationsService.findAll(itemId);
  }

  @Mutation(() => Conversation, { name: 'createConversation' })
  createConversation(@Args('itemId', { type: () => Int }) itemId: number) {
    return this.conversationsService.create(itemId);
  }
}