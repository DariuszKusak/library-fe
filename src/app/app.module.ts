import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BookListComponent } from './book-list/book-list.component';
import {RouterModule, Routes} from '@angular/router';
import { PostListComponent } from './post-list/post-list.component';
import { InformationComponent } from './information/information.component';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  {path : '', component : InformationComponent},
  {path : 'books', component : BookListComponent},
  {path : 'posts', component : PostListComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    PostListComponent,
    InformationComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
