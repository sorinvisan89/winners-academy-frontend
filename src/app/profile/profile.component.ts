import {Component, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [DatePipe]
})


export class ProfileComponent implements OnInit {



  constructor() {

  }


  ngOnInit() {
  }

}
