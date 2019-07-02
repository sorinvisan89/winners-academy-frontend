import {Outcome} from '../models/outcome';

export class Match {

  matchId: bigint;
  name: string;
  tips: string;
  result: Outcome;
  odds: number;
  date: string;
}
