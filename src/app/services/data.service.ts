import {Injectable} from '@angular/core';
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

  getBooks(): Observable<Book[]> {
    console.log(environment.restUrl + environment.version + 'books');
    return this.http.get<Book[]>(environment.restUrl + environment.version + 'books').
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

}
