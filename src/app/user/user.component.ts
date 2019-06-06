import {Component, OnInit} from '@angular/core';
import {User} from '../models/user';
import {UserPage} from '../models/user-page';
import {UserService} from '../services/user.service';
import {Ticket} from '../shared/ticket';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private userService: UserService) {
  }

  users: User[];
  pageUser: UserPage;
  selectedPage = 0;
  selectedUser: User;

  getClient(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }

  getPageUsers(requestedPage: number): void {
    this.userService.getPageUsers(requestedPage)
      .subscribe(page => this.pageUser = page);

  }

  ngOnInit() {
    this.getPageUsers(0);
  }

  onSelect(page: number): void {
    console.log('selected page : ' + page);
    this.selectedPage = page;
    this.getPageUsers(page);
  }

  selectUser(currentUser: User) {
    this.selectedUser = currentUser;
  }


}
