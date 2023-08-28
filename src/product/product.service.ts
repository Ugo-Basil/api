import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProductDocument } from './product.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async create(
    name: string,
    price: number,
    description?: string,
  ): Promise<ProductDocument> {
    const newProduct = new this.productModel({ name, description, price });
    const result = await newProduct.save();
    return result;
  }

  async findAll(): Promise<ProductDocument[]> {
    return this.productModel.find().exec();
  }

  async findOne(id: string): Promise<ProductDocument> {
    return this.productModel.findById(id).exec();
  }

  async update(
    id: string,
    name: string,
    price: number,
    description?: string,
  ): Promise<ProductDocument> {
    const updatedProduct = await this.productModel.findById(id).exec();
    updatedProduct.name = name ?? updatedProduct.name;
    updatedProduct.price = price ?? updatedProduct.price;
    updatedProduct.description = description ?? updatedProduct.description;
    return updatedProduct.save();
  }

  async delete(id: string): Promise<ProductDocument> {
    const deletedProduct = await this.productModel.findById(id).exec();
    return deletedProduct.deleteOne();
  }
}
