import {Component, OnInit} from '@angular/core';
import {Book} from '../../model/Book';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  message = '';
  detailedBook: Book;

  constructor(private dataService: DataService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(
      params => {
        this.getBookById(params['bookId']);
      }
    );
  }

  private getBookById(id: number) {
    this.dataService.getBookById(id).subscribe(
      detailedBook => {
        this.detailedBook = detailedBook;
      }
    );
  }

  borrowBook(book: Book) {
    this.dataService.borrowBook(book).subscribe(
      next => {
        this.router.navigate(['usersBooks']);
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

  returnToCatalog() {
    this.router.navigate(['catalog']);
  }

}
