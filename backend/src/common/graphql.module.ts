/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: true,
      playground: true,
      autoSchemaFile: './graphql/schema.gql',
      cors: {
        credential: true,
        origin: true,
      }
    }),
  ],
  providers: []
})
export class GraphqlModule {}
