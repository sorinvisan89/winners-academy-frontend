import {Component, OnInit} from '@angular/core';
import {RestConsumerComponent} from '../rest-consumer/rest-consumer.component';
import {Match} from '../shared/match';
import {Ticket} from '../shared/ticket';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-daily',
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.css'],
  providers: [DatePipe]
})
export class DailyComponent implements OnInit {

  currentDate: string;
  minusOneDate: string;
  minusTwoDate: string;
  minusThreeDate: string;
  minusFourDate: string;
  minusFiveDate: string;
  minusSixDate: string;
  minusSevenDate: string;

  Matches: Match[] = [];

  constructor(private restConsumer: RestConsumerComponent, private datePipe: DatePipe) {
    const now = new Date();
    this.currentDate = this.datePipe.transform(now, 'yyyy-MM-dd');
    this.minusOneDate = this.datePipe.transform(new Date().setDate(now.getDate() - 1), 'yyyy-MM-dd');
    this.minusTwoDate = this.datePipe.transform(new Date().setDate(now.getDate() - 2), 'yyyy-MM-dd');
    this.minusThreeDate = this.datePipe.transform(new Date().setDate(now.getDate() - 3), 'yyyy-MM-dd');
    this.minusFourDate = this.datePipe.transform(new Date().setDate(now.getDate() - 4), 'yyyy-MM-dd');
    this.minusFiveDate = this.datePipe.transform(new Date().setDate(now.getDate() - 5), 'yyyy-MM-dd');
    this.minusSixDate = this.datePipe.transform(new Date().setDate(now.getDate() - 6), 'yyyy-MM-dd');
    this.minusSevenDate = this.datePipe.transform(new Date().setDate(now.getDate() - 7), 'yyyy-MM-dd');
  }

  ngOnInit() {
  }

  getTicket(ticketDate: string) {
    this.restConsumer.getTicketByDate(ticketDate)
      .subscribe(tickets => {
        if (tickets != null) {
          this.Matches = tickets.matchList;
        } else {
          this.Matches = [];
        }
      });
  }
}
