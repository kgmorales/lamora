import { Module } from '@nestjs/common';
import { AuthService } from './auth._service';
import { AuthController } from './auth._controller';
import { SpotifyStrategy } from './strategies/spotify-oauth.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async () => {
        return {
          secret: process.env.JWT_SECRET,
          signOptions: {
            expiresIn: '3600s',
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, JwtStrategy, SpotifyStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
