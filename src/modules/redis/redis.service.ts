import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService extends Redis {
  constructor(configService: ConfigService) {
    super(configService.getOrThrow('redis.url'), {
      enableAutoPipelining: true,
      name: 'redis',
    });
  }
}
