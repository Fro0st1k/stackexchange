import { IAnswer } from './answer';
import { IOwner } from './owner';

export interface IQuestion {
  tags: string[];
  owner: IOwner;
  is_answered: boolean;
  view_count: number;
  answer_count: number;
  score: number;
  last_activity_date: number;
  creation_date: number;
  question_id: number;
  link: string;
  title: string;
  body?: string;
  answers?: IAnswer[];
}
