import {Component, OnInit} from '@angular/core';
import {Book} from "../../model/Book";
import {DataService} from "../../services/data.service";
import {User} from "../../model/User";
import {Sort} from "@angular/material";
import {ActivatedRoute, Router} from "@angular/router";
import {AbstractControl, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  userBooks: Book[];
  sortedUsers: User[];
  detailedUser: User;
  showUserBooks = false;
  showUserDetails = false;
  currentId;

  public readonly id = 'Id';
  public readonly login = 'Login';
  public readonly password = 'Password';
  public readonly role = 'Role';
  panelOpenState = false;

  displayedColumns: string[] = [this.id, this.login];

  constructor(private dataService: DataService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getUsers();
  }

  public userForm: FormGroup = new FormGroup({
    userLogin: new FormControl(''),
    userPassword: new FormControl(''),
    userRole: new FormControl('')
  });

  private get userDescriptionControl(): AbstractControl {
    return this.userForm.get('userLogin');
  }

  userDetails(user: User) {
    this.detailedUser = this.sortedUsers.find(usr => user.id === usr.id);
    this.userForm.get('userLogin').setValue(this.detailedUser.login);
    this.userForm.get('userPassword').setValue(this.detailedUser.password);
    this.userForm.get('userRole').setValue(this.detailedUser.role);
    this.showUserBooks = false;
    this.showUserDetails = true;
  }

  updateUser() {
    alert('updateUser');
    this.detailedUser.login = this.userForm.get('userLogin').value;
    this.detailedUser.password = this.userForm.get('userPassword').value;
    this.detailedUser.role = this.userForm.get('userRole').value;
    this.dataService.updateUser(this.detailedUser).subscribe();
  }

  getUsers() {
    this.dataService.getUsers().subscribe(
      users => {
        this.sortedUsers = users;
      }
    );
  }

  listUserBooks(user: User) {
    this.dataService.getUserBooks(user).subscribe(
      userBooks => {
        this.userBooks = userBooks;
      }
    );
    this.router.navigate(['adminPanel'], {queryParams: {id: user.id}});
    this.showUserDetails = false;
    this.showUserBooks = true;
    this.currentId = user.id;
  }

  showForm() {
    this.userDescriptionControl.setValue(this.userDescriptionControl.value);
    console.log(this.userDescriptionControl);
  }

  returnBook(book: Book) {
    console.log(this.currentId);
    const user = this.sortedUsers.find(user => user.id === this.currentId);
    this.dataService.returnBook(user, book).subscribe(
      data => {
        this.listUserBooks(user);
      }
    );
  }

  sortData(sort: Sort) {
    const data = this.sortedUsers.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedUsers = data;
      return;
    }

    this.sortedUsers = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case this.id:
          return compare(a.id, b.id, isAsc);
        case this.login:
          return compare(a.id, b.id, isAsc);
        default:
          return 0;
      }
    });
  }
}


function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
