import {Match} from './match';
import {Outcome} from './Outcome';

export class Ticket {

  ticketId: bigint;
  date: string;
  totalOdds: number;
  matchList: Match[];
  status: Outcome;

}
