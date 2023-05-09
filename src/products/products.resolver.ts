import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { v4 as uuid } from 'uuid';
import { Product } from './product.model';
import { ProductsService } from './products.service';

@Resolver('Product')
export class ProductsResolver {
  constructor(private productsService: ProductsService) {}

  @Query(() => [Product])
  async products() {
    return this.productsService.getProducts();
  }

  @Query(() => Product)
  async product(@Args('id') id: string) {
    return this.productsService.getProductById(id);
  }

  @Mutation(() => Product)
  async createProduct(
    @Args('name') name: string,
    @Args('price') price: number,
  ) {
    const newProduct = { id: uuid(), name, price };
    return this.productsService.createProduct(newProduct);
  }
}
