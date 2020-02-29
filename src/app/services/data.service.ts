import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Book} from '../model/Book';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {User} from '../model/User';
import {Mail} from "../model/Mail";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  chosenBookEventEmitter = new EventEmitter<number>();
  refreshBooks = new EventEmitter();

  constructor(private http: HttpClient) {
  }

  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(environment.restUrl + 'books/' + id, {withCredentials: true});
  }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(environment.restUrl + 'books', {withCredentials: true}).pipe(
      map(data => {
        const books = new Array<Book>();
        for (const bfb of data) {
          books.push(bfb);
        }
        return books;
      })
    );
  }

  borrowBook(book: Book): Observable<Book> {
    return this.http.put<Book>(environment.restUrl + 'books', book, {withCredentials: true});
  }

  createBook(book: Book): Observable<Book> {
    return this.http.post<Book>(environment.restUrl + 'books', book, {withCredentials: true});
  }

  returnBook(user: User, book: Book): Observable<void> {
    return this.http.delete<void>(environment.restUrl + 'users/' + user.login + '/book/' + book.id, {withCredentials: true});
  }

  updateBook(book: Book): Observable<Book> {
    return this.http.put<Book>(environment.restUrl + 'books/update', book, {withCredentials: true});
  }

  deleteBook(id: number): Observable<Book> {
    return this.http.delete<Book>(environment.restUrl + 'books/' + id, {withCredentials: true});
  }

  getUserByLogin(login: string) {
    return this.http.get<User>(environment.restUrl + 'users/' + login, {withCredentials: true});
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(environment.restUrl + 'users', {withCredentials: true});
  }

  createUser(user: User, password: string): Observable<User> {
    const headers = new HttpHeaders().append('Password', password);
    return this.http.post<User>(environment.restUrl + 'users', user, {headers, withCredentials: true});
  }

  createAccount(user: User): Observable<User> {
    return this.http.post<User>(environment.restUrl + 'accounts', user, {withCredentials: true});
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(environment.restUrl + 'users', user, {withCredentials: true});
  }

  getUserBooks(user: User): Observable<Book[]> {
    return this.http.get<Book[]>(environment.restUrl + 'users/' + user.login + '/books', {withCredentials: true});
  }

  getLoggedUserBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(environment.restUrl + 'users/books', {withCredentials: true});
  }

  deleteUser(login: string): Observable<User> {
    return this.http.delete<User>(environment.restUrl + 'users/delete/' + login, {withCredentials: true});
  }

  blockUser(login: string): Observable<User> {
    return this.http.put<User>(environment.restUrl + 'users/disable/' + login, null, {withCredentials: true});
  }

  unBlockUser(login: string): Observable<User> {
    return this.http.put<User>(environment.restUrl + 'users/enable/' + login, null, {withCredentials: true});
  }

  sendMail(mail: Mail) {
    return this.http.post<Mail>(environment.restUrl + 'mail', mail, {withCredentials: true});
  }

  validateUser(name: string, password: string): Observable<{ result: string }> {
    const authData = btoa(`${name}:${password}`);
    const headers = new HttpHeaders().append('Authorization', 'Basic ' + authData).append('X-Requested-With', 'XMLHttpRequest');
    return this.http.get<{ result: string }>(environment.restUrl + 'basicAuth/validate', {headers, withCredentials: true});
  }

  logout(): Observable<string> {
    return this.http.get<string>(environment.restUrl + 'users/logout', {withCredentials: true});
  }

}
