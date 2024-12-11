export type SWapiPage<T> = {
  count: number;
  next: string;
  previous: string;
  results: T[];
};
