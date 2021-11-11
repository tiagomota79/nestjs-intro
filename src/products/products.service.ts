import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { randomString } from 'src/utils';
import { Product } from './product.model';

interface ProductType {
  productId: string;
  title: string;
  description: string;
  price: number;
}

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async insertProduct(title: string, description: string, price: number) {
    // const productId = randomString();
    const newProduct = new this.productModel({ title, description, price });

    const insertedProduct = await newProduct.save();

    return insertedProduct;
  }

  async getProducts() {
    const allProducts = await this.productModel.find();
    return allProducts;
  }

  private async findProduct(productId: string): Promise<Product> {
    let product;
    try {
      product = await this.productModel.findById(productId);
      console.log(product);
    } catch (error) {
      if (!product) throw new NotFoundException('Product not found.');
    }

    if (!product) throw new NotFoundException('Product not found.');

    return product;
  }

  async getSingleProduct(productId: string) {
    const product = await this.findProduct(productId);
    return product;
  }

  async updateProduct(
    productId: string,
    title: string,
    description: string,
    price: number,
  ) {
    const updatedProduct = await this.findProduct(productId);

    if (title) updatedProduct.title = title;
    if (description) updatedProduct.description = description;
    if (price) updatedProduct.price = price;

    updatedProduct.save();

    return updatedProduct;
  }

  // deleteProduct(productId: string) {
  //   const [_, index] = this.findProduct(productId);

  //   this.products.splice(index, 1);
  // }
}
