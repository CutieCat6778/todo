import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { Session, SessionSchema } from 'src/schemas/session.schema';
import { SessionService } from 'src/session/session.service';

@Module({
  imports: [
    PassportModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Session.name, schema: SessionSchema },
    ]),
    JwtModule.register({
      signOptions: { expiresIn: '7d' },
      secret: process.env.SECRET,
    }),
  ],
  providers: [
    AuthService,
    AuthResolver,
    LocalStrategy,
    UserService,
    JwtStrategy,
    SessionService,
  ],
})
export class AuthModule {}
