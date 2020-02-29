import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../model/User';
import {AuthService} from '../../services/auth.service';
import {DataService} from '../../services/data.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.css']
})
export class UserInformationComponent implements OnInit, OnDestroy {

  loggedUser: User;
  getLoggedUserSubscription: Subscription;

  constructor(private authService: AuthService,
              private dataService: DataService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(
      params => {
        this.getLoggedUser(params['userLogin']);
      }
    );
  }

  getLoggedUser(login: string) {
    this.getLoggedUserSubscription = this.dataService.getUserByLogin(login).subscribe(
      user => {
        this.loggedUser = user;
      }
    );
  }

  ngOnDestroy(): void {
    this.getLoggedUserSubscription.unsubscribe();
  }


}
