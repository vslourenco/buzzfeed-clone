import { Question } from './question';

export interface Quiz {
  title: string;
  questions: Question[];
}
