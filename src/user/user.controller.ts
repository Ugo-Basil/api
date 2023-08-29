import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDetails } from './user.details.interface';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('all')
  async getAllUsers() {
    return await this.userService.findAll();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserDetails | null> {
    return await this.userService.findOneById(id);
  }
}
