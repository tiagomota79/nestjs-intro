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
  addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ): any {
    return this.productsService.insertProduct(prodTitle, prodDesc, prodPrice);
  }

  @Get()
  getAllProducts() {
    return this.productsService.getProducts();
  }

  @Get(':productId')
  getProduct(@Param('productId') productId: string) {
    return this.productsService.getSingleProduct(productId);
  }

  @Patch(':productId')
  updateProduct(
    @Param('productId') productId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    this.productsService.updateProduct(
      productId,
      prodTitle,
      prodDesc,
      prodPrice,
    );

    return this.productsService.getSingleProduct(productId);
  }

  @Delete(':productId')
  removeProduct(@Param('productId') productId: string) {
    this.productsService.deleteProduct(productId);
    return 'Product successfully deleted';
  }
}
