import {Component, Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Ticket} from '../shared/ticket';
import {User} from '../models/user';

@Component({
  selector: 'app-rest-consumer',
  templateUrl: './rest-consumer.component.html',
  styleUrls: ['./rest-consumer.component.css']
})

@Injectable({
  providedIn: 'root'
})
export class RestConsumerComponent implements OnInit {
  apiURL = 'http://localhost:5000';

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit() {
  }

  public getTicketByDate(ticketDate: string): Observable<Ticket> {
    const requestBody = {ticketDate: ticketDate};
    return this.httpClient.get<Ticket>(this.apiURL + '/ticket/daily', {params: requestBody});
  }

  public getAllTickets(): Observable<Ticket[]> {
    return this.httpClient.get<Ticket[]>(this.apiURL + '/tickets');
  }

  // public getAllTickets(): Observable<Page> {
  //   return this.httpClient.get<Ticket[]>(this.apiURL + '/tickets');
  // }

}
