import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {RestConsumerComponent} from '../rest-consumer/rest-consumer.component';
import {Match} from '../shared/match';
import {Ticket} from '../shared/ticket';
import {DatePipe} from '@angular/common';
import {NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {Outcome} from '../shared/Outcome';

@Component({
  selector: 'app-daily',
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.css'],
  providers: [DatePipe]
})
export class DailyComponent implements OnInit {

  Matches: Match[] = [];
  ticketOdds: number;
  ticketResult: Outcome;
  focus2: boolean;
  minDate: NgbDateStruct;
  maxDate: NgbDateStruct;
  today: NgbDateStruct;


  constructor(private restConsumer: RestConsumerComponent, private calendar: NgbCalendar, private datePipe: DatePipe) {
    const today = this.calendar.getToday();
    this.maxDate = today;
    this.minDate = this.calendar.getPrev(today, 'd', 7);
    this.today = this.maxDate;
  }

  ngOnInit() {
  }

  onDateSelection(event: NgbDate) {
    const date = new Date(event.year, event.month - 1, event.day);
    const toFetch = this.datePipe.transform(date, 'yyyy-MM-dd');
    this.getTicket(toFetch);
  }

  private getTicket(ticketDate: string) {
    this.restConsumer.getTicketByDate(ticketDate)
      .subscribe(ticket => {
        if (ticket != null) {
          this.Matches = ticket.matchList;
          this.ticketOdds = ticket.totalOdds;
          this.ticketResult = ticket.status;
        } else {
          this.Matches = [];
        }
      });
  }
}
