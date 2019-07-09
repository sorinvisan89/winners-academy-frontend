import {Match} from './match';
import {Outcome} from '../models/outcome';

export class Ticket {

  ticketId: bigint;
  date: string;
  totalOdds: number;
  matchList: Match[];
  status: Outcome;
  ticketType: string;

}
