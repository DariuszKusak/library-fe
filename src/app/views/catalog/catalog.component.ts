import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Book} from '../../model/Book';
import {DataService} from '../../services/data.service';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';
import {MatSort} from '@angular/material/sort';
import {AuthService} from "../../services/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit, OnDestroy {

  public readonly author = 'author';
  public readonly title = 'title';
  public readonly amount = 'amount';

  bookDataSource = new MatTableDataSource<Book>();
  displayedColumns: string[] = [this.author, this.title, this.amount];
  currentBookSelectedId;
  refreshBookSubscription: Subscription;
  getBooksSubscription: Subscription;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private dataService: DataService,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.getBooks();
    this.refreshBookSubscription = this.dataService.refreshBooks.subscribe(
      result => {
        this.getBooks();
      }
    );
  }

  getBooks() {
    this.getBooksSubscription = this.dataService.getBooks().subscribe(
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
    this.currentBookSelectedId = id;
    if (this.authService.getRole() === 'USER') {
      this.router.navigate(['bookDetails'], {queryParams: {'bookId': id}});
    } else if (this.authService.getRole() === 'ADMIN') {
      this.dataService.chosenBookEventEmitter.emit(id);
    } else {
      this.router.navigate(['login']);
    }
  }

  ngOnDestroy(): void {
    this.getBooksSubscription.unsubscribe();
    this.refreshBookSubscription.unsubscribe();
  }


}
