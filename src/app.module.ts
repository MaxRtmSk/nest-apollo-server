import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { TracksModule } from './modules/tracks/tracks.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TracksModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      context: (context) => {
        return context;
      },
    }),
  ],
})
export class AppModule {}
