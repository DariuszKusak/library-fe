import {Component, OnInit, ViewChild} from '@angular/core';
import {Book} from '../../model/Book';
import {DataService} from '../../services/data.service';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  public readonly id = 'Id';
  public readonly author = 'author';
  public readonly title = 'title';
  public readonly amount = 'amount';

  bookDataSource = new MatTableDataSource<Book>();
  displayedColumns: string[] = [this.author, this.title, this.amount];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private dataService: DataService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.dataService.getBooks().subscribe(
      data => {
        this.bookDataSource = new MatTableDataSource<Book>(data);
        this.bookDataSource.sort = this.sort;
        this.bookDataSource.paginator = this.paginator;
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.bookDataSource.filter = filterValue.trim().toLowerCase();
  }

  private bookDetails(id: number) {
    this.router.navigate(['bookDetails'], {queryParams: {'bookId': id}});
  }

}
