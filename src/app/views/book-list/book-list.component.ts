import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {Book} from '../../model/Book';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, OnDestroy {

  books: Book[];
  booksSubscription: Subscription;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.booksSubscription = this.dataService.getBooks().subscribe(
      books => {
        this.books = books;
        console.log(this.books[0].description);
      }
    );
  }

  ngOnDestroy(): void {
    this.booksSubscription.unsubscribe();
  }

}
