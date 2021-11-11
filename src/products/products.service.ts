import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async insertProduct(title: string, description: string, price: number) {
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

  async deleteProduct(productId: string) {
    const result = await this.productModel.deleteOne({ _id: productId });
    if (result.deletedCount === 0)
      throw new NotFoundException('Product not found');
  }
}
