import { Injectable } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  async getProducts(): Promise<Product[]> {
    return this.products;
  }

  async getProductById(id: string): Promise<Product> {
    return this.products.find((product) => product.id === id);
  }

  async createProduct(product: Product): Promise<Product> {
    this.products.push(product);
    return product;
  }
}
