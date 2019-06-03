import {Component, OnInit} from '@angular/core';
import {RestConsumerComponent} from '../rest-consumer/rest-consumer.component';
import {Match} from '../shared/match';
import {Ticket} from '../shared/ticket';

@Component({
  selector: 'app-daily',
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.css']
})
export class DailyComponent implements OnInit {

  Matches: Match[] = [];

  constructor(private restConsumer: RestConsumerComponent) {
  }

  ngOnInit() {
  }

  getTicket() {
    this.restConsumer.getTicketByDate('2019-06-02')
      .subscribe(tickets => {
        if (tickets != null) {
          this.Matches = tickets.matchList;
        }
      });
  }
}
