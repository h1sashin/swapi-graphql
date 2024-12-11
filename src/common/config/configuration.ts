import { GRAPHQL_ENDPOINT } from '@common/constants';
import { Config } from './configuration.interface';

export const configuration = (): Config => {
  const environment = process.env.NODE_ENV || 'development';
  const isDev = environment === 'development';
  if (!process.env.REDIS_URL) throw new Error('REDIS_URL is not set');
  if (!process.env.SWAPI_HOST) throw new Error('SWAPI_HOST is not set');
  return {
    port: parseInt(process.env.PORT ?? '8080'),
    environment: process.env.NODE_ENV ?? 'development',
    redis: {
      url: process.env.REDIS_URL,
    },
    graphql: {
      path: GRAPHQL_ENDPOINT,
      introspection: isDev,
      graphiql: isDev,
    },
    http: {
      baseURL: process.env.SWAPI_HOST,
      timeout: parseInt(process.env.HTTP_TIMEOUT || '10000'),
      params: { format: 'json' },
    },
  };
};
