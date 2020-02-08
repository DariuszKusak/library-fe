import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {Book} from '../../model/Book';


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, OnDestroy {

  books: Book[];

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.loadBooks();
  }

  borrowBook(id: number) {
    this.dataService.borrowBook(id).subscribe(
      next => {
        this.loadBooks();
      }
    );
  }

  loadBooks() {
    this.dataService.getAvailableBooks().subscribe(
      books => {
        this.books = books;
      });
  };

  ngOnDestroy(): void {

  }

}
