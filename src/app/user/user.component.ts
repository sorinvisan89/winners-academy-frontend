import {Component, Input, OnInit} from '@angular/core';
import {User} from '../models/user';
import {UserPage} from '../models/user-page';
import {UserService} from '../services/user.service';
import {ModalDismissReasons, NgbActiveModal, NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormControl, FormGroup, Validator, Validators} from '@angular/forms';
import {SnackbarService} from 'ngx-snackbar';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {

  editUserForm: FormGroup;
  addUserForm: FormGroup;

  constructor(private userService: UserService, private modalService: NgbModal,
              private formBuilder: FormBuilder, private snackbarService: SnackbarService) {
    this.getPageUsers(0);
  }

  users: User[];
  pageUser: UserPage;
  selectedPage = 0;
  selectedUser: User;
  userTypeSelect = 'NORMAL';

  getPageUsers(requestedPage: number): void {
    this.userService.getPageUsers(requestedPage)
      .subscribe(page => this.pageUser = page);
  }

  ngOnInit() {
    this.editUserForm = this.formBuilder.group({
      username: new FormControl(''),
      name: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      type: new FormControl('')
    });

    this.addUserForm = this.formBuilder.group({
      username: new FormControl(''),
      name: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      type: new FormControl('')
    });
  }

  onSelect(page: number): void {
    this.selectedPage = page;
    this.getPageUsers(page);
  }

  selectUser(currentUser: User) {
    this.selectedUser = currentUser;
  }

  addUser(content) {
    this.modalService.open(content, {windowClass: 'modal-danger', centered: true}).result.then((result) => {
      this.userService.addUser(this.editUserForm.value).subscribe(
        user => {
          this.refreshData();
        },
        error => {
          this.snackbarService.add({
            msg: 'Unable to add user: ' + this.editUserForm.value.name,
            action: {
              text: 'Dismiss!'
            }
          });
        },
        () => {
          this.snackbarService.add({
            msg: 'Added user: ' + this.editUserForm.value.name,
            timeout: 5000,
            action: {
              text: 'Dismiss!'
            }
          });
        });

    });
  }

  editUser(content) {
    this.modalService.open(content, {windowClass: 'modal-danger', centered: true}).result.then((result) => {
      this.userService.editUser(this.selectedUser).subscribe(editedUser => {
          this.refreshData();
        },
        error => {
          window.alert(error.toString());
        },
        () => {
          window.alert('');
        });
    }, (reason) => {

    });
  }

  deleteUser(content) {
    this.modalService.open(content, {windowClass: 'modal-danger', centered: true}).result.then((result) => {
      this.userService.deleteUser(this.selectedUser.userId).subscribe(deletedUser => {
          this.refreshDataWhenDeleting();
        },
        error => {
          this.snackbarService.add({
            msg: 'Unable to delete user: ' + this.selectedUser.name,
            action: {
              text: 'Dismiss!'
            }
          });
        },
        () => {
          this.snackbarService.add({
            msg: 'Deleted user: ' + this.selectedUser.name,
            timeout: 5000,
            action: {
              text: 'Dismiss!'
            }
          });
        });
    }, (reason) => {
    });
  }

  private refreshDataWhenDeleting() {
    this.getPageUsers(this.selectedPage);
    if (this.pageUser.content.length === 1) {
      if (this.selectedPage !== 0) {
        this.selectedPage = this.selectedPage - 1;
        this.getPageUsers(this.selectedPage);
      } else {
        this.selectedUser = null;
      }
    }
    this.users = this.pageUser.content;
  }

  private refreshData() {
    this.getPageUsers(this.selectedPage);
    this.users = this.pageUser.content;
  }

}
