import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { UserDetails } from './user.details.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}
  _getUserDetails(user: UserDocument): UserDetails {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }

  async create(
    name: string,
    email: string,
    hashedPassword: string,
  ): Promise<UserDocument> {
    const newUser = new this.userModel({
      name,
      email,
      password: hashedPassword,
    });
    const result = await newUser.save();
    return result;
  }

  async findOneByEmail(email: string): Promise<UserDetails | null> {
    const user = await this.userModel.findOne({ email });
    if (!user) return null;
    return this._getUserDetails(user);
  }

  async findOneById(id: string): Promise<UserDetails | null> {
    const user = await this.userModel.findById(id).exec();
    if (!user) return null;
    return this._getUserDetails(user);
  }

  async findAll(): Promise<UserDetails[]> {
    const users = await this.userModel.find();
    if (!users) return [];
    return users.map((user) => this._getUserDetails(user));
  }
}
