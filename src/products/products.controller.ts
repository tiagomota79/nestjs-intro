import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post()
  async addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ): Promise<any> {
    const addedProduct = await this.productsService.insertProduct(
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return addedProduct;
  }

  @Get()
  async getAllProducts() {
    const allProducts = await this.productsService.getProducts();
    return allProducts;
  }

  @Get(':productId')
  async getProduct(@Param('productId') productId: string) {
    const product = await this.productsService.getSingleProduct(productId);
    return product;
  }

  @Patch(':productId')
  async updateProduct(
    @Param('productId') productId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    const updatedProduct = await this.productsService.updateProduct(
      productId,
      prodTitle,
      prodDesc,
      prodPrice,
    );

    return updatedProduct;
  }

  @Delete(':productId')
  async removeProduct(@Param('productId') productId: string) {
    await this.productsService.deleteProduct(productId);
    return 'Product successfully deleted';
  }
}
