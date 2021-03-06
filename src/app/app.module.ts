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
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorModule,
  MatRadioModule,
  MatSidenavModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTreeModule
} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {CatalogComponent} from './views/catalog/catalog.component';
import {AdminPanelComponent} from './views/admin-panel/admin-panel.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './views/login/login.component';
import {UserInformationComponent} from './views/user-information/user-information.component';
import {BookDetailsComponent} from './views/book-details/book-details.component';
import {AdminGuardService} from './guards/admin-guard.service';
import {AdminUserGuardService} from './guards/admin-user-guard.service';
import {UserGuardService} from './guards/user-guard.service';
import { MailComponent } from './views/mail/mail.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

const routes: Routes = [
  {path: '', component: InformationComponent},
  {path: 'catalog', component: CatalogComponent},
  {path: 'usersBooks', component: BookListComponent, canActivate: [UserGuardService]},
  {path: 'adminPanel', component: AdminPanelComponent, canActivate: [AdminGuardService]},
  {path: 'login', component: LoginComponent},
  {path: 'userInformation', component: UserInformationComponent, canActivate: [AdminUserGuardService]},
  {path: 'bookDetails', component: BookDetailsComponent, canActivate: [AdminUserGuardService]},
  {path: 'mail', component: MailComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    InformationComponent,
    MenuComponent,
    CatalogComponent,
    AdminPanelComponent,
    LoginComponent,
    UserInformationComponent,
    BookDetailsComponent,
    MailComponent
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
    FormsModule,
    MatRadioModule,
    MatTreeModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatPaginatorModule,
    MatProgressSpinnerModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
