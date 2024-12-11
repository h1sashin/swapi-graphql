import { PER_PAGE } from '@common/constants';
import { PageInfo } from '@common/graphql/page-info.model';
import { SWapiPage } from '@common/types';

export function swapiPageToPageInfo<T extends unknown, P extends SWapiPage<T>>(
  data: P,
  page: number,
): { pageInfo: PageInfo; results: T[] } {
  const pageInfo: PageInfo = {
    page,
    perPage: PER_PAGE,
    hasNextPage: !!data.next,
    hasPreviousPage: !!data.previous,
    total: data.count,
    totalPages: Math.ceil(data.count / PER_PAGE),
  };
  return { pageInfo, results: data.results };
}
