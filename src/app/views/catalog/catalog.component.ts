import {Component, OnInit, ViewChild} from '@angular/core';
import {Book} from '../../model/Book';
import {DataService} from '../../services/data.service';
import {MatPaginator, Sort} from '@angular/material';
import {Router} from '@angular/router';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  public readonly id = 'Id';
  public readonly author = 'Autor';
  public readonly title = 'Tytuł';
  public readonly amount = 'Pozostało';

  displayedColumns: string[] = [this.id, this.author, this.title, this.amount];
  sortedBooks: Book[];
  filterString = '';
  allBooks: Book[];

  constructor(private dataService: DataService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getBooks();
    this.dataService.getBooks().subscribe(
      data => {
        this.allBooks = data;
      }
    );
  }

  public filter(event: Event): void {
    this.filterString =  (event.target as HTMLInputElement).value;
    const filteredBooks = [];
    for (const book of this.allBooks) {
      if (book.title.toLowerCase().includes(this.filterString.toLowerCase()) || book.author.toLowerCase().includes(this.filterString.toLowerCase())) {
        filteredBooks.push(book);
      }
    }
    this.sortedBooks = filteredBooks;
  }

  private bookDetails(id: number) {
    this.router.navigate(['usersBooks'], {queryParams: {id}});
  }

  private getBooks() {
    this.dataService.getBooks().subscribe(
      data => {
        this.sortedBooks = data;
      }
    );
  }

  sortData(sort: Sort) {
    const data = this.sortedBooks.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedBooks = data;
      return;
    }

    this.sortedBooks = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case this.id:
          return compare(a.id, b.id, isAsc);
        case this.title:
          return compare(a.title, b.title, isAsc);
        case this.author:
          return compare(a.author, b.author, isAsc);
        case this.amount:
          return compare(a.amount, b.amount, isAsc);
        default:
          return 0;
      }
    });
  }


}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
