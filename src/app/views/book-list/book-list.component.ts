import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {Book} from '../../model/Book';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, OnDestroy {

  books: Book[];
  isBorrowMode = false;
  borrowedBook: Book;
  message = '';
  user = {
    id: 1,
    login: 'd_user',
    password: '123',
    role: 'USER'
  };

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private router: Router,
  ) {
  }

  ngOnInit() {
    this.loadBooks('d_user');
    this.route.queryParams.subscribe(
      params => {
        const id = params['id'];
        if (id) {
          this.getBookById(id);
        }
      }
    );
  }

  private getBookById(id: number) {
    this.dataService.getBookById(id).subscribe(
      borrowedBook => {
        this.borrowedBook = borrowedBook;
        this.isBorrowMode = true;
      }
    );
  }

  borrowBook(id: number) {
    this.dataService.borrowBook(id).subscribe(
      next => {
        this.loadBooks('d_user');
        this.isBorrowMode = false;
        this.router.navigate(['usersBooks'])
      }, (error) => {
        if (error.error.status === 4441) {
          this.message = error.error.error;
        }
        if (error.error.status === 4444) {
          this.message = error.error.error;
        }
      }
    );
  }

  loadBooks(login: string) {
    this.dataService.getUserBooks(this.user).subscribe(
      books => {
        this.books = books;
      });
  };

  ngOnDestroy(): void {

  }

}
