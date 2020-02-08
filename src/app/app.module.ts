import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BookListComponent } from './views/book-list/book-list.component';
import {RouterModule, Routes} from '@angular/router';
import { PostListComponent } from './views/post-list/post-list.component';
import { InformationComponent } from './views/information/information.component';
import { MenuComponent } from './menu/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material';

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
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
