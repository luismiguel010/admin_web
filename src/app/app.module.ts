import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { UsersService } from './services/users.service';
import { InsertImeiModalService } from './services/insert-imei-modal.service';
import { DeleteImeiModalService } from './services/delete-imei-modal.service';
import { HttpModule } from '@angular/http';
import {ReactiveFormsModule} from '@angular/forms'; 
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './pages/users/users.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { InsertImeiModalComponent } from './modals/insert-imei-modal/insert-imei-modal.component';
import { UpdateImeiModalComponent } from './modals/update-imei-modal/update-imei-modal.component';
import { UpdateImeiModalService } from './services/update-imei-modal.service';
import { DeleteImeiModalComponent } from './modals/delete-imei-modal/delete-imei-modal.component';
import { LoginComponent } from './login/login.component';
import { UsersCardsComponent } from './pages/users-cards/users-cards.component';
import { ImeisListModalComponent } from './modals/imeis-list-modal/imeis-list-modal.component';
import { ImeisListService } from './services/imeis-list.service';
import { FilterPipe } from './pipes/filter.pipe';
import { FilterUsersPipe } from './pages/users-cards/filter-users.pipe';
import { FilterImeisPipe } from './modals/imeis-list-modal/filter-imeis.pipe';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'users', component: UsersCardsComponent},
  {path: 'insert_imei_modal', component: InsertImeiModalComponent},
  {path: 'update_imei_modal', component: UpdateImeiModalComponent},
  {path: 'delete_imei_modal', component: DeleteImeiModalComponent},
  {path: 'imeis_list_modal', component:  ImeisListModalComponent},
  { path: 'login', component: LoginComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    HeaderComponent,
    FooterComponent,
    InsertImeiModalComponent,
    UpdateImeiModalComponent,
    DeleteImeiModalComponent,
    LoginComponent,
    UsersCardsComponent,
    ImeisListModalComponent,
    FilterPipe,
    FilterUsersPipe,
    FilterImeisPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes ),
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule
  ],
  providers: [
    UsersService,
    InsertImeiModalService,
    UpdateImeiModalService,
    DeleteImeiModalService,
    ImeisListService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
