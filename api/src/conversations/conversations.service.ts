import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Args, Int } from '@nestjs/graphql';

@Injectable()
export class ConversationsService {
  constructor(private prisma: PrismaService) {}

  // Obtains all conversations for an item
  findAll(@Args('itemId', { type: () => Int }) itemId: number) {
    return this.prisma.item.findUnique({
        where: {
            id: itemId
        },
        select: {
            conversations: true,
        }
    });
  }

  // Creates a new conversation and update Item's conversations scalar list
  // This will be triggered when an OwnerApplication is accepted
  create(@Args('itemId', { type: () => Int }) itemId: number) {
    return this.prisma.conversation.create({
      data: {
        itemId: itemId,
      }
    });
  }
}