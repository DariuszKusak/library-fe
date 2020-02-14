import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Book} from '../model/Book';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {User} from "../model/User";

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
    return this.http.get<Book[]>(environment.restUrl + environment.version + 'books/all').pipe(
      map(data => {
        const books = new Array<Book>();
        for (const bfb of data) {
          books.push(bfb);
        }
        return books;
      })
    )
  }

  getUserBooks(user: User): Observable<Book[]> {
    return this.http.get<Book[]>(environment.restUrl + environment.version + 'u2b/' + user.login + '/' + user.password);
  }

  borrowBook(id: number): Observable<Book> {
    return this.http.put<Book>(environment.restUrl + environment.version + 'books/' + id + '/d_user/123', null);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(environment.restUrl + environment.version + '/users/all');
  }

  returnBook(user: User, book: Book): Observable<void> {
    return this.http.delete<void>(environment.restUrl + environment.version + 'u2b/return/' + user.login + '/' + user.password + '/' + book.id);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(environment.restUrl + environment.version + '/users', user);
  }
}
