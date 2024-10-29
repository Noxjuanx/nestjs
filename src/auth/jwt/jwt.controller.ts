import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('protected') 
@Controller('protected')
export class JwtController {
  @Get()
  @UseGuards(AuthGuard('jwt')) 
  @ApiBearerAuth() 
  getProtectedResource() {
    return { message: 'Token Valido' };
  }
}

