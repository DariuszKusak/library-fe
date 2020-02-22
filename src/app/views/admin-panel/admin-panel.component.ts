import {Component, OnInit} from '@angular/core';
import {Book} from '../../model/Book';
import {DataService} from '../../services/data.service';
import {User} from '../../model/User';
import {MatTreeFlatDataSource, MatTreeFlattener, Sort} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {FlatTreeControl} from '@angular/cdk/tree';

interface FoodNode {
  name: string;
  children?: FoodNode[];
}

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  USER_PANEL = 'Zarządzaj użytkownikami';
  ADD_USER = 'Utwórz użytkownika';
  SHOW_USERS = 'Wyświetl użytkowników';
  BOOK_PANEL = 'Zarządzaj książkami';
  ADD_BOOK = 'Dodaj ksiazke';
  EDIT_BOOK = 'Usuń/Edytuj książkę';

  OPTION_PANEL: FoodNode[] = [
    {
      name: this.USER_PANEL,
      children: [
        {name: this.ADD_USER},
        {name: this.SHOW_USERS}
      ]
    }, {
      name: this.BOOK_PANEL,
      children: [
        {name: this.ADD_BOOK},
        {name: this.EDIT_BOOK}
      ]
    }
  ];

  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  userBooks: Book[];
  sortedUsers: User[];
  detailedUser: User;
  showUserDetails = false;
  showBookDetails = false;
  currentUserSelectedId;
  nodeValue = '';

  panelOpenState = false;

  constructor(private dataService: DataService,
              private router: Router) {
    this.dataSource.data = this.OPTION_PANEL;
  }

  public readonly login = 'Login';
  public readonly name = 'Imie';
  public readonly lastName = 'Nazwisko';
  public readonly email = 'Email';
  public readonly bookLimit = 'Limit książek';

  displayedColumns: string[] = [this.login, this.name, this.lastName, this.email, this.bookLimit];

  ngOnInit() {
    this.getUsers();
  }

  navigateSection(nodeValue: string) {
    if (nodeValue === this.ADD_USER) {
      this.router.navigate(['addUser']);
    } else {
      this.nodeValue = nodeValue;
    }
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  public userForm: FormGroup = new FormGroup({
    userLogin: new FormControl(''),
    userName: new FormControl(''),
    userLastName: new FormControl(''),
    userEmail: new FormControl(''),
    userBookLimit: new FormControl('')
  });

  updateUser() {
    let user = new User();
    user.id = this.detailedUser.id;
    user.login = this.detailedUser.login;
    user.name = this.detailedUser.name;
    user.lastName = this.detailedUser.lastName;
    user.email = this.userForm.get('userEmail').value;
    user.bookLimit = this.userForm.get('userLimit').value;
    this.dataService.updateUser(user).subscribe(
      user => {
        this.getUsers();
      }
    );
  }

  getUsers() {
    this.dataService.getUsers().subscribe(
      users => {
        this.sortedUsers = users;
      }
    );
  }

  getUserBooks(user: User) {
    this.dataService.getUserBooks(user).subscribe(
      userBooks => {
        this.userBooks = userBooks;
        this.router.navigate(['adminPanel']);
        this.showUserDetails = false;
        this.showBookDetails = true;
        this.currentUserSelectedId = user.id;
      }
    );
  }

  getUsersDetail(user: User) {
    this.detailedUser = this.sortedUsers.find(usr => user.id === usr.id);
    this.userForm.get('userLogin').setValue(user.login);
    this.userForm.get('userName').setValue(user.name);
    this.userForm.get('userLastName').setValue(user.lastName);
    this.userForm.get('userEmail').setValue(user.email);
    this.userForm.get('userBookLimit').setValue(user.bookLimit);
    this.showUserDetails = true;
    this.showBookDetails = false;
    this.currentUserSelectedId = user.id;
  }

  returnBook(book: Book) {
    const user = this.sortedUsers.find(user => user.id === this.currentUserSelectedId);
    this.dataService.returnBook(user, book).subscribe(
      data => {
        this.getUserBooks(user);
      }
    );
  }

  deleteUser() {
    const login = this.userForm.get('userLogin').value;
    this.dataService.deleteUser(login).subscribe(
      user => {
        this.getUsers();
      }
    );

    this.userForm.get('userLogin').setValue('');
    this.userForm.get('userPassword').setValue('');
    this.userForm.get('userRole').setValue('');
    this.userForm.get('userLimit').setValue('');
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
        case this.login:
          return compare(a.login, b.login, isAsc);
        case this.name:
          return compare(a.name, b.name, isAsc);
        case this.lastName:
          return compare(a.lastName, b.lastName, isAsc);
        case this.email:
          return compare(a.email, b.email, isAsc);
        case this.bookLimit:
          return compare(a.bookLimit, b.bookLimit, isAsc);
        default:
          return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
