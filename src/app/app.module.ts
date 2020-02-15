import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BookListComponent} from './views/book-list/book-list.component';
import {RouterModule, Routes} from '@angular/router';
import {InformationComponent} from './views/information/information.component';
import {MenuComponent} from './menu/menu.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule
} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {CatalogComponent} from './views/catalog/catalog.component';
import {AdminPanelComponent} from './views/admin-panel/admin-panel.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './views/login/login.component';
import {AuthGuardService} from './guards/auth-guard.service';

const routes: Routes = [
  {path: '', component: InformationComponent},
  {path: 'catalog', component: CatalogComponent},
  {path: 'usersBooks', component: BookListComponent, canActivate: [AuthGuardService]},
  {path: 'adminPanel', component: AdminPanelComponent, canActivate: [AuthGuardService]},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    InformationComponent,
    MenuComponent,
    CatalogComponent,
    AdminPanelComponent,
    LoginComponent
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
    MatButtonModule,
    MatSortModule,
    MatTableModule,
    MatMenuModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
