import { Field, ObjectType } from '@nestjs/graphql';
import { UserSecure } from 'src/schemas/user.schema';
@ObjectType()
class Data {
  @Field()
  access_token: string;

  @Field(() => UserSecure)
  user: UserSecure;
}
@ObjectType()
export class LoginResponse {
  @Field()
  status: number;

  @Field()
  data: Data;

  @Field()
  withCookie: boolean;
}
