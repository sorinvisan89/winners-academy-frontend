import {Component, Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Ticket} from '../shared/ticket';

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

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit() {
  }

  public getTicketByDate(ticketDate: string): Observable<Ticket> {
    const requestBody = {ticketDate: ticketDate};
    return this.httpClient.get<Ticket>(this.apiURL + '/ticket', {params: requestBody});
  }
}
