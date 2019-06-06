import {Match} from './match';

export class Ticket {

  ticketId: bigint;
  date: string;
  totalOdds: number;
  matchList: Match[];
  status: string;

}
