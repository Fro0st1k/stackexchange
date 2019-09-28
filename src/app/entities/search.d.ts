import { IQuestion } from './question';

export interface ISearchResult {
  items: IQuestion[];
  has_more: boolean;
  quota_max: number;
  quota_remaining: number;
}
