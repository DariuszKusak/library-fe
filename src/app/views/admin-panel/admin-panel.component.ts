import {Component, OnInit} from '@angular/core';
import {Book} from '../../model/Book';
import {DataService} from '../../services/data.service';
import {User} from '../../model/User';
import {MatTreeFlatDataSource, MatTreeFlattener, Sort} from '@angular/material';
import {Router} from '@angular/router';
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
  SHOW_USERS = 'Usuń/Edytuj użytkownika';
  BOOK_PANEL = 'Zarządzaj książkami';
  ADD_BOOK = 'Dodaj ksiazke';
  SHOW_BOOKS = 'Usuń/Edytuj książkę';

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
        {name: this.SHOW_BOOKS}
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
  showUserDetails = false;
  showBookDetails = false;
  currentUserSelectedId;
  infoMessage = '';
  successMessage = '';
  panelOpenState = false;

  constructor(private dataService: DataService,
              private router: Router) {
    this.dataSource.data = this.OPTION_PANEL;
  }

  public readonly login = 'login';
  public readonly name = 'name';
  public readonly lastName = 'lastName';
  public readonly email = 'email';
  public readonly bookLimit = 'bookLimit';
  activeNode: any;
  hidePassword = true;

  displayedColumns: string[] = [this.login, this.name, this.lastName, this.email, this.bookLimit];

  ngOnInit() {
    this.getUsers();
  }

  navigateSection(node: Node) {
    this.activeNode = node;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  public userForm: FormGroup = new FormGroup({
    userName: new FormControl(''),
    userLastName: new FormControl(''),
    userEmail: new FormControl(''),
    userBookLimit: new FormControl('')
  });

  public newUserForm: FormGroup = new FormGroup({
    newUserLogin: new FormControl(''),
    newUserName: new FormControl(''),
    newUserLastName: new FormControl(''),
    newUserEmail: new FormControl(''),
    newUserBookLimit: new FormControl(''),
    newUserPassword: new FormControl('')
  });

  public newBookForm: FormGroup = new FormGroup({
    newBookTitle: new FormControl(''),
    newBookAuthor: new FormControl(''),
    newBookDescription: new FormControl(''),
    newBookImageUrl: new FormControl(''),
    newBookGenre: new FormControl(''),
    newBookYear: new FormControl(''),
    newBookAmount: new FormControl('')
  });

  updateUser() {
    this.clearMessages();
    let user = this.getCurrentUser();
    console.log(user);
    user.name = this.userForm.get('userName').value;
    user.lastName = this.userForm.get('userLastName').value;
    user.email = this.userForm.get('userEmail').value;
    user.bookLimit = this.userForm.get('userBookLimit').value;
    this.dataService.updateUser(user).subscribe(
      user => {
        this.getUsers();
      }
    );
  }

  getUsers() {
    this.clearMessages();
    this.dataService.getUsers().subscribe(
      users => {
        this.sortedUsers = users;
      }
    );
  }

  getUserBooks(user: User) {
    this.clearMessages();
    this.dataService.getUserBooks(user).subscribe(
      userBooks => {
        this.userBooks = userBooks;
        this.router.navigate(['adminPanel']);
        this.showUserDetails = false;
        this.showBookDetails = true;
        this.currentUserSelectedId = user.id;
        if (this.userBooks.length === 0) {
          this.infoMessage = `Użytkownik ${user.login} nie wypożyczył żadnych książek`;
        }
      }
    );
  }

  getUsersDetail(user: User) {
    this.clearMessages();
    this.userForm.get('userName').setValue(user.name);
    this.userForm.get('userLastName').setValue(user.lastName);
    this.userForm.get('userEmail').setValue(user.email);
    this.userForm.get('userBookLimit').setValue(user.bookLimit);
    this.showUserDetails = true;
    this.showBookDetails = false;
    this.currentUserSelectedId = user.id;
  }

  returnBook(book: Book) {
    this.clearMessages();
    const user = this.sortedUsers.find(user => user.id === this.currentUserSelectedId);
    this.dataService.returnBook(user, book).subscribe(
      data => {
        this.getUserBooks(user);
      }
    );
  }

  clearMessages() {
    this.infoMessage = '';
    this.successMessage = '';
  }

  getCurrentUser() {
    return this.sortedUsers.find(usr => usr.id === this.currentUserSelectedId);
  }

  createUser() {
    this.clearMessages();
    let newUser = new User();
    newUser.login = this.newUserForm.get('newUserLogin').value;
    newUser.name = this.newUserForm.get('newUserName').value;
    newUser.lastName = this.newUserForm.get('newUserLastName').value;
    newUser.email = this.newUserForm.get('newUserEmail').value;
    newUser.bookLimit = this.newUserForm.get('newUserBookLimit').value;
    this.dataService.createUser(newUser, this.newUserForm.get('newUserPassword').value).subscribe(
      user => {
        this.getUsers();
        this.successMessage = `Pomyślnie utworzono użytkownika ${user.login}`;
      }, error => {
        if (error.error.status === 4444) {
          this.infoMessage = error.error.error;
        }
      }
    );
  }

  deleteUser() {
    this.clearMessages();
    this.dataService.deleteUser(this.getCurrentUser().login).subscribe(
      user => {
        this.getUsers();
      }
    );
  }

  blockUser() {
    this.clearMessages();
    this.dataService.blockUser(this.getCurrentUser().login).subscribe(
      user => {
        this.getUsers();
        this.successMessage = `Użytkownik ${user.login} został zablokowany`;
      }
    );
  }

  unBlockUser() {
    this.clearMessages();
    this.dataService.unBlockUser(this.getCurrentUser().login).subscribe(
      user => {
        this.getUsers();
        this.successMessage = `Użytkownik ${user.login} został odblokowany`;
      }
    );
  }

  createBook() {
    this.clearMessages();
    let newBook = new Book();
    newBook.title = this.newBookForm.get('newBookTitle').value;
    newBook.author = this.newBookForm.get('newBookAuthor').value;
    newBook.description = this.newBookForm.get('newBookDescription').value;
    newBook.imageUrl = this.newBookForm.get('newBookImageUrl').value;
    newBook.genre = this.newBookForm.get('newBookGenre').value;
    newBook.year = this.newBookForm.get('newBookYear').value;
    newBook.amount = this.newBookForm.get('newBookAmount').value;
    newBook.available = newBook.amount > 0;
    this.dataService.createBook(newBook).subscribe(
      book => {
        this.successMessage = `Utworzono książkę ${book.title} autorstwa ${book.author}`;
      }, error => {
        if (error.error.status === 4445) {
          this.infoMessage = error.error.error;
        }
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
