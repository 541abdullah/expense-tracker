import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt-auth.strategy';


@Module({
  imports: [ConfigModule.forRoot(), PassportModule, forwardRef(() => UserModule), JwtModule.register({
    signOptions: { expiresIn: '1200s' },
    secret: process.env.JWT_SECRET
  })],
  providers: [AuthService, AuthResolver, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule { }
