import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GraphQLModule } from '@nestjs/graphql';
import { YogaDriver, YogaDriverConfig } from '@graphql-yoga/nestjs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configuration } from './common/config/configuration';
import { Config } from './common/config/configuration.interface';
import { FilmsModule } from '@module/films/films.module';
import { VehiclesModule } from '@module/vehicles/vehicles.module';
import { StarshipsModule } from '@module/starships/starships.module';
import { PlanetsModule } from '@module/planets/planets.module';
import { SpeciesModule } from '@module/species/species.module';
import { HttpModule } from '@nestjs/axios';
import { join } from 'path';
import { useResponseCache } from '@envelop/response-cache';
import { createRedisCache } from '@envelop/response-cache-redis';
import { RedisModule } from '@module/redis/redis.module';
import { RedisService } from '@module/redis/redis.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.local'],
      load: [configuration],
    }),
    HttpModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<Config>) => ({
        ...configService.get('http'),
      }),
    }),
    GraphQLModule.forRootAsync<YogaDriverConfig>({
      driver: YogaDriver,
      imports: [ConfigModule, RedisModule],
      inject: [ConfigService, RedisService],
      useFactory: (
        config: ConfigService<Config, true>,
        redis: RedisService,
      ) => ({
        ...config.getOrThrow('graphql'),
        autoSchemaFile: join(__dirname, 'schema.graphql'),
        context: ({ req, res }) => {
          const loadersStorage = new Map<string, any>();
          return { loaders: loadersStorage, req, res };
        },
        plugins: [
          useResponseCache({
            session: () => null,
            ttl: 1000 * 60 * 60 * 24,
            cache: createRedisCache({ redis }),
            includeExtensionMetadata: true,
            // enabled: () => false,
          }),
        ],
      }),
    }),
    RedisModule,
    StarshipsModule,
    VehiclesModule,
    PlanetsModule,
    SpeciesModule,
    FilmsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
