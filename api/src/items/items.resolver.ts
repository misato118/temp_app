import { Resolver, Args, Query } from '@nestjs/graphql';
import { Item } from './models/item.model';
import { ItemsService } from './items.service';
import { CreateItemInput } from './dto/create-item.input';

@Resolver(() => Item)
export class ItemsResolver {
  constructor(
    private itemsService: ItemsService,
  ) {}

  @Query(() => [Item], { name: 'item' })
  async findAll() {
    return this.itemsService.findAll();
  }
}