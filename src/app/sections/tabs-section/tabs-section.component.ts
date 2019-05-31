import {Component, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-tabs-section',
  templateUrl: './tabs-section.component.html',
  styleUrls: ['./tabs-section.component.css'],
  providers: [DatePipe]
})
export class TabsSectionComponent implements OnInit {

  currentDate: string;
  minusOneDate: string;
  minusTwoDate: string;
  minusThreeDate: string;
  minusFourDate: string;
  minusFiveDate: string;
  minusSixDate: string;

  page = 2;
  page1 = 3;

  constructor(private datePipe: DatePipe) {
    const now = new Date();
    this.currentDate = this.datePipe.transform(now, 'yyyy-MM-dd');
    this.minusOneDate = this.datePipe.transform(new Date().setDate(now.getDate()  - 1), 'yyyy-MM-dd');
    this.minusTwoDate = this.datePipe.transform(new Date().setDate(now.getDate()  - 2), 'yyyy-MM-dd');
    this.minusThreeDate = this.datePipe.transform(new Date().setDate(now.getDate()  - 3), 'yyyy-MM-dd');
    this.minusFourDate = this.datePipe.transform(new Date().setDate(now.getDate()  - 4), 'yyyy-MM-dd');
    this.minusFiveDate = this.datePipe.transform(new Date().setDate(now.getDate()  - 5), 'yyyy-MM-dd');
    this.minusSixDate = this.datePipe.transform(new Date().setDate(now.getDate()  - 6), 'yyyy-MM-dd');
  }

  ngOnInit() {
  }

}
