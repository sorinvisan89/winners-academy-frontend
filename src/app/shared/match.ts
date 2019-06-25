import {Outcome} from './Outcome';

export class Match {

  matchId: bigint;
  name: string;
  tips: string;
  result: Outcome;
  odds: number;
  date: string;
}
