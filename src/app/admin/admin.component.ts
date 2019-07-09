import {Component, OnInit} from '@angular/core';
import {RestConsumerComponent} from '../rest-consumer/rest-consumer.component';
import {Ticket} from '../shared/ticket';
import {Match} from '../shared/match';
import {DatePipe} from '@angular/common';

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

  constructor(private restConsumer: RestConsumerComponent,
              private datePipe: DatePipe) {
  }

  ngOnInit() {
    this.getTickets();
  }

  getTickets() {
    this.restConsumer.getAllTickets()
      .subscribe(tickets => {
        this.currentTickets = tickets;
      });
  }

  selectTicket(currentTicket: Ticket) {
    this.selectedTicket = currentTicket;
    console.log(currentTicket.date);
    this.restConsumer.getTicketById(currentTicket.ticketId)
      .subscribe(ticket => {
        console.log(ticket);
        this.currentMatches = ticket.matchList;
      });
  }
}
