import { Controller, Post, Body } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from '../services/user.service';

@ApiTags('User')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Create count client or account manager' })
  @Post('/users')
  async createUser(@Body() user: User): Promise<User> {
    return this.userService.createUser(user);
  } 
}
