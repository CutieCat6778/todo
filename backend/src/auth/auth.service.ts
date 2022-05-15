import { SignupUserInput } from './dto/signup.input';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { Compare, Hash } from 'src/utils/hasher';
import { LoginUserInput } from './dto/login-user.input';
import { User } from 'src/schemas/user.schema';
import { SessionService } from 'src/session/session.service';
import { Session } from 'src/schemas/session.schema';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private sessionService: SessionService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findUser(username);
    if (user && Compare(password, user.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  async validateToken(token: string): Promise<Session> {
    const data = await this.sessionService.findOne(token);
    if (!data) return null;
    const decoded: {
      username: string;
      subarray: string;
      iat: number;
      exp: number;
    } = this.sessionService.parseJwt(token);
    if (Date.now() >= decoded.exp * 1000) {
      await this.sessionService.delete(token);
      return null;
    } else return data;
  }

  async cookieLogin(token: string): Promise<User> {
    const tokenData = await this.validateToken(token);
    if (!tokenData) throw new Error('Invalid access_token!');
    const user = await this.userService.findUserId(tokenData.id);
    if (!user) throw new Error('User not found!');
    return user;
  }

  async login(
    loginUserInput: LoginUserInput,
  ): Promise<{ access_token: string; user: User }> {
    const user = await this.userService.findUser(loginUserInput.username);

    const token = this.jwtService.sign({
      username: user.username,
      subarray: user._id,
    });

    await this.sessionService.create(token, user._id.toString());

    return {
      access_token: token,
      user: user,
    };
  }

  async signup(signupUserInput: SignupUserInput): Promise<any> {
    const user = await this.userService.findUser(signupUserInput.username);
    if (user) throw new Error('User already existed!');

    const email = await this.userService.findEmail(signupUserInput.email);
    if (email) throw new Error('Email have been used!');

    const password = await Hash(signupUserInput.password);

    return this.userService.createUser({
      ...signupUserInput,
      password,
    });
  }
}
