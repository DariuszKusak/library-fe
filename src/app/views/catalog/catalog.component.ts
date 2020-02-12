import {Component, OnInit} from '@angular/core';
import {Book} from '../../model/Book';
import {DataService} from '../../services/data.service';
import {Sort} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  displayedColumns: string[] = ['id', 'author', 'title', 'amount'];
  sortedBooks: Book[];

  constructor(private dataService: DataService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getBooks();
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
        case 'id':
          return compare(a.id, b.id, isAsc);
        case 'title':
          return compare(a.title, b.title, isAsc);
        case 'author':
          return compare(a.author, b.author, isAsc);
        case 'description':
          return compare(a.description, b.description, isAsc);
        case 'available':
          return compare(String(a.available), String(b.available), isAsc);
        case 'genre':
          return compare(a.genre, b.genre, isAsc);
        case 'amount':
          return compare(a.amount, b.amount, isAsc);
        case 'year':
          return compare(a.year, b.year, isAsc);
        default:
          return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
