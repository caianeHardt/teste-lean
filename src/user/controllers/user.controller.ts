import { Controller, Post, Body } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.request.dto';

@ApiTags('User')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Create count client or account manager' })
  @Post('/create-user')
  async createUser(@Body() user: CreateUserDto): Promise<User> {
    return this.userService.createUser(user);
  } 
}
