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

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.loadBooks();
    this.route.queryParams.subscribe(
      params => {
        const id = params['id'];
        if (id) {
          this.isBorrowMode = true;
          this.getBookById(id);
        } else {
          this.isBorrowMode = false;
        }
      }
    );
  }

  private getBookById(id: number) {
    this.dataService.getBookById(id).subscribe(
      borrowedBook => {
        this.borrowedBook = borrowedBook;
      }
    );
  }

  borrowBook(id: number) {
    this.dataService.borrowBook(id).subscribe(
      next => {
        this.loadBooks();
        this.borrowedBook = null;
        this.router.navigate(['catalog'])
      }, error => {
        if (error.error.status === 422) {
          alert('Ksiązka została już przez Ciebie wypożyczona.')
        }
      }
    );
  }

  loadBooks() {
    this.dataService.getBooks4User().subscribe(
      books => {
        this.books = books;
      });
  };

  ngOnDestroy(): void {

  }

}
