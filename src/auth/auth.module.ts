import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { AuthController } from './auth.controller'; 
import { JwtStrategy } from '../auth/jwt/jwt.strategy';
import { JwtController } from './jwt/jwt.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: 'aT5@3yM#fQef&zXq1yT7g$P', 
      signOptions: { expiresIn: '60s' }, 
    }),
  ],
  providers: [AuthService, UsersService, JwtStrategy],
  controllers: [AuthController, JwtController],
})
export class AuthModule {}
