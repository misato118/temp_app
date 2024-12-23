import { Resolver, Args, Query } from '@nestjs/graphql';
import { StockStatus } from './models/stockStatus.model';
import { StockStatusesService } from './stockStatuses.service';
//import { CreateStockStatusInput } from './dto/create-stockStatus.input';

@Resolver(() => StockStatus)
export class StockStatusesResolver {
  constructor(
    private StockStatuswsService: StockStatusesService,
  ) {}

  @Query(() => [StockStatus], { name: 'stockStatus' })
  async findAll() {
    return this.StockStatuswsService.findAll();
  }
}