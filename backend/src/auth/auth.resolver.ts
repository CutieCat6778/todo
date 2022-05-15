import { GqlAuthGuard } from './gql-auth.guard';
import { AuthService } from './auth.service';
import { Args, Context, Mutation, Resolver, Query } from '@nestjs/graphql';
import { LoginResponse } from './dto/login-response';
import { LoginUserInput } from './dto/login-user.input';
import { UseGuards } from '@nestjs/common';
import { User } from 'src/schemas/user.schema';
import { SignupUserInput } from './dto/signup.input';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  async login(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
    @Context('req') req: any,
  ): Promise<LoginResponse> {
    const data = await this.authService.login(loginUserInput);
    console.log(data);
    req.res?.cookie('access_token', data.access_token, {
      maxAge: 1000 * 60 * 60 * 48,
    });
    return { withCookie: false, status: 202, data };
  }

  @Mutation(() => User)
  signup(@Args('signupUserInput') signupUserInput: SignupUserInput) {
    return this.authService.signup(signupUserInput);
  }

  @Query(() => User)
  cookieLogin(@Context('req') req: any): Promise<User> {
    if (!req.cookies?.access_token)
      throw new Error('No access_token has been found!');
    else {
      try {
        return this.authService.cookieLogin(req.cookies.access_token);
      } catch (e) {
        req.res.clearCookie('access_token');
        throw e;
      }
    }
  }
}
