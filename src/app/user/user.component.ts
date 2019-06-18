import {Component, Input, OnInit} from '@angular/core';
import {User} from '../models/user';
import {UserPage} from '../models/user-page';
import {UserService} from '../services/user.service';
import {ModalDismissReasons, NgbActiveModal, NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Ticket} from '../shared/ticket';
import {FormBuilder, FormControl, FormGroup, Validator, Validators} from '@angular/forms';

interface Ion {
  username: string;
  name: string;
  type: string;
  email: string;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {

  editUserForm: FormGroup;
  username: FormControl;
  name: FormControl;
  type: FormControl;
  email: FormControl;

  constructor(private userService: UserService, private modalService: NgbModal, private formBuilder: FormBuilder) {
  }

  users: User[];
  pageUser: UserPage;
  selectedPage = 0;
  selectedUser: User;
  closeResult: string;

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


  liviu() {
    console.log(this.editUserForm.value, 'liviu ');
  }

  onSelect(page: number): void {
    console.log('selected page : ' + page);
    this.selectedPage = page;
    this.getPageUsers(page);
  }

  selectUser(currentUser: User) {
    this.selectedUser = currentUser;
  }

  deleteUser(toDelete: User) {
    this.userService.deleteUser(toDelete.userId).subscribe(result => console.log(result));
  }

  open(content, type, modalDimension) {
    if (modalDimension === 'sm' && type === 'modal_mini') {
      this.miniModal(content);
    } else if (modalDimension === '' && type === 'Notification') {
      this.notification(content);
    } else {
      this.normalModal(content);
    }
  }


  addUser(content) {
    this.modalService.open(content, {windowClass: 'modal-danger', centered: true}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(this.editUserForm.value);
      console.log('bbbb');
    }, (reason) => {
      this.closeResult = `Dismissed ${UserComponent.getDismissReason(reason)}`;
    });
  }

  editUser(content) {
    this.modalService.open(content, {windowClass: 'modal-danger', centered: true}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(this.editUserForm.value);
    }, (reason) => {
      this.closeResult = `Dismissed ${UserComponent.getDismissReason(reason)}`;
    });
  }


  private miniModal(content) {
    this.modalService.open(content, {windowClass: 'modal-mini', size: 'sm', centered: true}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${UserComponent.getDismissReason(reason)}`;
    });
  }

  private notification(content) {
    this.modalService.open(content, {windowClass: 'modal-danger', centered: true}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log('bbbb');
    }, (reason) => {
      console.log('aaa');
      this.closeResult = `Dismissed ${UserComponent.getDismissReason(reason)}`;
      reason.close();
    });
  }

  private normalModal(content) {
    this.modalService.open(content, {centered: true}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${UserComponent.getDismissReason(reason)}`;
    });
  }

  private refreshData() {
    this.getPageUsers(0);
    this.users = this.pageUser.content;
  }

}
