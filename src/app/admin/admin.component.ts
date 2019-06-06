import {Component, OnInit} from '@angular/core';
import {RestConsumerComponent} from '../rest-consumer/rest-consumer.component';
import {Ticket} from '../shared/ticket';
import {Match} from '../shared/match';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  currentTickets: Ticket[] = [];
  currentMatches: Match[] = [];

  selectedTicket: Ticket;
  selectedMatch: Match;


  constructor(private restConsumer: RestConsumerComponent) {
  }

  ngOnInit() {
    this.getTickets();
  }

  getTickets() {
    this.restConsumer.getAllTickets()
      .subscribe(tickets => {
        this.currentTickets = tickets;
        console.log(tickets);
      });
  }

  selectTicket(currenTicket: Ticket) {
    this.selectedTicket = currenTicket;
    this.restConsumer.getTicketByDate(currenTicket.date)
      .subscribe(ticket => {
        this.currentMatches = ticket.matchList;
      });
  }

}
