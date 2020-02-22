import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {Book} from '../../model/Book';
import {ActivatedRoute, Router} from '@angular/router';
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
    this.loadBooks();
  }

  loadBooks() {
    this.booksSubscription = this.dataService.getLoggedUserBooks().subscribe(
      books => {
        this.books = books;
      });
  };

  ngOnDestroy(): void {
    this.booksSubscription.unsubscribe();
  }

}
