import { Injectable, NotFoundException } from '@nestjs/common';
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

  insertProduct(
    title: string,
    description: string,
    price: number,
  ): ProductType {
    const productId = randomString();
    const newProduct = new Product(productId, title, description, price);
    this.products.push(newProduct);
    return {
      productId,
      title,
      description,
      price,
    };
  }

  getProducts() {
    return [...this.products];
  }

  private findProduct(productId: string): [Product, number] {
    const productIndex = this.products.findIndex(
      (product) => product.id === productId,
    );
    const product = this.products[productIndex];
    if (!product) throw new NotFoundException('Product not found.');

    return [product, productIndex];
  }

  getSingleProduct(productId: string) {
    const product = this.findProduct(productId)[0];
    return { ...product };
  }

  updateProduct(
    productId: string,
    title: string,
    description: string,
    price: number,
  ) {
    const [product, index] = this.findProduct(productId);
    const updatedProduct = { ...product };

    if (title) updatedProduct.title = title;
    if (description) updatedProduct.description = description;
    if (price) updatedProduct.price = price;

    this.products[index] = updatedProduct;
  }

  deleteProduct(productId: string) {
    const [_, index] = this.findProduct(productId);

    this.products.splice(index, 1);
  }
}
