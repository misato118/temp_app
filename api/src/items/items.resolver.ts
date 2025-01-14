import { Resolver, Args, Query, Mutation, Int } from '@nestjs/graphql';
import { Item } from './models/item.model';
import { ItemsService } from './items.service';
import { CreateItemInput } from './dto/create-item.input';
import { Company } from 'src/companies/models/company.model';

@Resolver(() => Item)
export class ItemsResolver {
  constructor(
    private itemsService: ItemsService,
  ) {}

  // Obtain all items
  @Query(() => [Item], { name: 'item' })
  async findAll() {
    return this.itemsService.findAll();
  }

  // Obtain item details
  @Query(() => Item, { name: 'itemInfo' })
  async findOneByItemId(@Args('itemId', { type: () => Int }) itemId: number) {
    return this.itemsService.findOneById(itemId);
  }

  // Create a new item (e.g., when saving a new item draft)
  @Mutation(() => Company, { name: 'createItem' })
  async createItem(@Args('createItemInput') createItemInput: CreateItemInput) {
    return this.itemsService.create(createItemInput);
  }

  /*
  // Submit an item for assessment
  @Mutation(() => Item, { name: 'submitItem' })
  async submitItem(@Args('createItemInput') createItemInput: CreateItemInput) {
    if (createItemInput.id) { // Modify an item if it exists
      await this.itemsService.update(createItemInput);
    } else { // Create a new item
      await this.itemsService.create(createItemInput);
    }

    // Validate if any fields are null
    if (this.hasNullFields(createItemInput)) {
      return null; // TODO: What's better to be returned?
    }
    return this.itemsService.submit(createItemInput);
  }
  */

  // Delete an item
  @Mutation(() => Item, { name: 'deleteItem' })
  async deleteItem(@Args('itemId', { type: () => Int }) itemId: number) {
    return this.itemsService.delete(itemId);
  }  

  hasNullFields(createItemInput: CreateItemInput) {
    for (var field in createItemInput) {
      if (field == null) {
        return true;
      }
    }
    return false;
  }
  
}