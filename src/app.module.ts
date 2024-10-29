import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module'; 
import { AuthModule } from './auth/auth.module';
import { JwtController } from './auth/jwt/jwt.controller';

@Module({
  imports: [UsersModule, AuthModule], 
  controllers: [AppController, JwtController],
  providers: [AppService],
})
export class AppModule {}
