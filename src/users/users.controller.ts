import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create.user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users') 
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('registrar')
  async register(@Body() createUserDto: CreateUserDto) {
    console.log('Registrando Usuario:', createUserDto);
    return this.usersService.create(createUserDto);
  }
}
