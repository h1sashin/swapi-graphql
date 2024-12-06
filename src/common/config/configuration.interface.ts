import { HttpModuleOptions } from '@nestjs/axios';

export type Config = {
  port: number;
  environment: string;
  redis: {
    url: string;
  };
  graphql: {
    path: string;
    introspection: boolean;
    graphiql: boolean;
  };
  http: HttpModuleOptions;
};
