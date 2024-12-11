import axios, {
  AxiosError,
  AxiosInstance,
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import Redis from 'ioredis';
import flatted from 'flatted';

export class SwapiAxiosCache {
  public cacheableMethods = ['GET', 'HEAD', 'OPTIONS'];
  public ttl = 60 * 60 * 24;
  constructor(public redis: Redis) {}

  static async createAdapter(
    config: AxiosRequestConfig,
    cacheInstance: SwapiAxiosCache,
  ): Promise<AxiosResponse> {
    try {
      if (config.method) {
        if (
          cacheInstance.cacheableMethods.includes(config.method.toUpperCase())
        ) {
          const key = cacheInstance.generateKey(config);
          const data = await cacheInstance.getCache(key);
          if (data) return data as AxiosResponse;
        }
        const response = await cacheInstance.fetch(config);
        if (
          cacheInstance.cacheableMethods.includes(config.method.toUpperCase())
        ) {
          await cacheInstance.setCache(config, response);
        }
        return response;
      }
      return cacheInstance.fetch(config);
    } catch (e) {
      if (e instanceof AxiosError && e.isAxiosError) throw e;
      return cacheInstance.fetch(config);
    }
  }

  private async setCache(
    config: AxiosRequestConfig,
    data: unknown,
  ): Promise<void> {
    const key = this.generateKey(config);
    const value = flatted.stringify(data);
    await this.redis.set(key, value, 'EX', this.ttl);
  }

  private async getCache<T extends unknown = unknown>(
    key: string,
  ): Promise<T | null> {
    const value = await this.redis.get(key);
    if (!value) return null;
    return flatted.parse(value) as T;
  }

  private generateKey(config: AxiosRequestConfig) {
    return (
      'cache:' +
      Buffer.from(
        ['method', 'url', 'data', 'params']
          .map((key) => {
            if (config[key]) return flatted.stringify(config[key]);
            return null;
          })
          .filter(Boolean)
          .join('__'),
      ).toString('base64')
    );
  }

  private fetch(config: AxiosRequestConfig): AxiosPromise {
    const axiosDefaultAdapter: AxiosInstance = axios.create(
      Object.assign(config, { adapter: axios.defaults.adapter }),
    );
    return axiosDefaultAdapter.request(config);
  }
}
