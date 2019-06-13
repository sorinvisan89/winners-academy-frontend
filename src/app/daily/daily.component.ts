import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {RestConsumerComponent} from '../rest-consumer/rest-consumer.component';
import {Match} from '../shared/match';
import {Ticket} from '../shared/ticket';
import {DatePipe} from '@angular/common';
import {NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-daily',
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.css'],
  providers: [DatePipe]
})
export class DailyComponent implements OnInit {

  Matches: Match[] = [];

  focus2;
  minDate: NgbDateStruct;
  maxDate: NgbDateStruct;

  constructor(private restConsumer: RestConsumerComponent, private calendar: NgbCalendar, private datePipe: DatePipe) {
    const today = this.calendar.getToday();
    this.maxDate = today;
    this.minDate = this.calendar.getPrev(today, 'd', 7);
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
      .subscribe(tickets => {
        if (tickets != null) {
          this.Matches = tickets.matchList;
        } else {
          this.Matches = [];
        }
      });
  }
}
