import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BookListComponent} from './views/book-list/book-list.component';
import {RouterModule, Routes} from '@angular/router';
import {PostListComponent} from './views/post-list/post-list.component';
import {InformationComponent} from './views/information/information.component';
import {MenuComponent} from './menu/menu.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCardModule, MatExpansionModule, MatListModule, MatTabsModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import { MatFormFieldModule, MatInputModule } from '@angular/material';

const routes: Routes = [
  {path: '', component: InformationComponent},
  {path: 'usersBooks', component: BookListComponent},
  {path: 'posts', component: PostListComponent}
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
    MatTabsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatListModule,
    MatCardModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
