import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { Item } from './models/item.model';
import { ItemsService } from './items.service';
import { CreateItemInput } from './dto/create-item.input';
import { Company } from 'src/companies/models/company.model';

@Resolver(() => Item)
export class ItemsResolver {
  constructor(
    private itemsService: ItemsService,
  ) {}

  @Query(() => [Item], { name: 'item' })
  async findAll() {
    return this.itemsService.findAll();
  }

  @Mutation(() => Company, { name: 'createItem' })
  createItem(@Args('createItemInput') createItemInput: CreateItemInput) {
    return this.itemsService.create(createItemInput);
  }
}