import { IQuestion } from './question';

export interface ISearchResult {
  items: IQuestion[];
  has_more: boolean;
  quota_max: number;
  quota_remaining: number;
  isUserQuestions?: boolean;
  userOrTagInfo?: any;
}
