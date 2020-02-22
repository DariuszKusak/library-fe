import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {User} from '../../model/User';
import {DataService} from '../../services/data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  hidePassword = true;
  message = '';

  constructor(private dataService: DataService,
              private router: Router) { }

  ngOnInit() {
  }

  public newUserForm: FormGroup = new FormGroup({
    newUserLogin: new FormControl(''),
    newUserName: new FormControl(''),
    newUserLastName: new FormControl(''),
    newUserEmail: new FormControl(''),
    newUserBookLimit: new FormControl(''),
    newUserPassword: new FormControl('')
  });

  createUser() {
    let newUser = new User();
    newUser.login = this.newUserForm.get('newUserLogin').value;
    newUser.name = this.newUserForm.get('newUserName').value;
    newUser.lastName = this.newUserForm.get('newUserLastName').value;
    newUser.email = this.newUserForm.get('newUserEmail').value;
    newUser.bookLimit = this.newUserForm.get('newUserBookLimit').value;
    this.dataService.createUser(newUser, this.newUserForm.get('newUserPassword').value).subscribe(
      user => {
        this.return();
      }, error => {
        if (error.error.status === 4444) {
          this.message = error.error.error;
        }
      }
    );
  }

  return() {
    this.router.navigate(['adminPanel']);
  }

}
