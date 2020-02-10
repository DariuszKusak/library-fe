import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Book} from '../model/Book';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {
  }

  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(environment.restUrl + environment.version + 'books/' + id);
  }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(environment.restUrl + environment.version + 'books/all').
      pipe(
        map( data => {
          const books = new Array<Book>();
          for(const bfb of data) {
            books.push(bfb);
          }
          return books;
        })
    )
  }

  getAvailableBooks(): Observable<Book[]> {
    return this.http.get<Array<Book>>(environment.restUrl + environment.version + 'books').
    pipe(
      map( data => {
        const books = new Array<Book>();
        for(const bfb of data) {
          books.push(bfb);
        }
        return books;
      })
    )
  }

  borrowBook(id: number): Observable<Book> {
    return this.http.put<Book>(environment.restUrl + environment.version + 'books/' + id + '/d_user/123', null);
  }

  getBooks4User(): Observable<Book[]> {
    return this.http.get<Book[]>(environment.restUrl + environment.version + 'u2b');
  }


}
