import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  async createProduct(@Body() data: any) {
    const { title, description, price } = data;
    const createdProduct = await this.productService.createProduct(title, description, price);
    return createdProduct;
  }

  @Get()
  async getAllProducts() {
    const products = await this.productService.getAllProducts();
    return products;
  }

  @Get(':id')
  async getProduct(@Param('id') id: number) {
    const product = await this.productService.getProduct(id);
    return product;
  }

  @Put(':id')
  async updateProduct(@Param('id') id: number, @Body() newData: any) {
    const updatedProduct = await this.productService.updateProduct(id, newData);
    return updatedProduct;
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: number) {
    const deletedProduct = await this.productService.deleteProduct(id);
    return deletedProduct;
  }
}
