/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { NewUserDTO } from 'src/user/dto/new-user.dto';
import { UserDetails } from 'src/user/user.details.interface';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private UserService: UserService) {}

  async hashPassword(password: string, salt: number): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async register(user: Readonly<NewUserDTO>): Promise<UserDetails | any> {
    const { name, email, password } = user;

    const existingUser = await this.UserService.findOneByEmail(email);

    if (existingUser) throw new Error('Email already in use');

    const hashedPassword = await this.hashPassword(password, 10);

    const newUser = await this.UserService.create(name, email, hashedPassword);

    return this.UserService._getUserDetails(newUser);
  }
}
