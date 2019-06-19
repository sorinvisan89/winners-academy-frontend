import {Component, Input, OnInit} from '@angular/core';
import {User} from '../models/user';
import {UserPage} from '../models/user-page';
import {UserService} from '../services/user.service';
import {ModalDismissReasons, NgbActiveModal, NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormControl, FormGroup, Validator, Validators} from '@angular/forms';

// import swal from 'sweetalert';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {

  editUserForm: FormGroup;

  constructor(private userService: UserService, private modalService: NgbModal, private formBuilder: FormBuilder) {
  }

  users: User[];
  pageUser: UserPage;
  selectedPage = 0;
  selectedUser: User;
  userTypeSelect = 'NORMAL';

  private static getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  getAllUsers(): void {
    this.userService.getAllUsers()
      .subscribe(users => this.users = users);
  }

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

  private deleteUser(toDelete: User) {
    this.userService.deleteUser(toDelete.userId).subscribe(result => console.log(result));
  }

  addUser(content) {
    this.modalService.open(content, {windowClass: 'modal-danger', centered: true}).result.then((result) => {
      this.userService.addUser(this.editUserForm.value).subscribe(
        user => {
          console.log(user);
        },
        error => {
          console.log(error);
        }
      );
    });
  }

  editUser(content) {
    this.modalService.open(content, {windowClass: 'modal-danger', centered: true}).result.then((result) => {
      this.refreshData();
    }, (reason) => {

    });
  }

  deleteUser2(content) {
    this.modalService.open(content, {windowClass: 'modal-danger', centered: true}).result.then((result) => {
      this.userService.deleteUser(this.selectedUser.userId).subscribe(deletedUser => {
          this.refreshData();
        },
        error => {
          window.alert('Deleted user failed with error: ' + error);
        });
    }, (reason) => {
    });
  }

  private refreshData() {
    this.getPageUsers(this.selectedPage);
    console.log(this.pageUser.content.length);
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

}
