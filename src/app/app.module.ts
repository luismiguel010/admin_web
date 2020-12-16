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
import { ImeisListComponent } from './pages/databases-tables/imeis-list/imeis-list.component';
import { ImeisListService } from './services/imeis-list.service';
import { FilterPipe } from './pipes/filter.pipe';
import { FilterUsersPipe } from './pages/users-cards/filter-users.pipe';
import { FilterImeisPipe } from './pages/databases-tables/imeis-list/filter-imeis.pipe';
import { UpdatePasswordModalComponent } from './modals/update-password-modal/update-password-modal.component';
import { UpdatePasswordModalService } from './services/update-password-modal.service';
import { UsersRoleComponent } from './pages/databases-tables/users-role/users-role/users-role.component';
import { UserRolesService } from './services/user-roles.service';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'users', component: UsersCardsComponent},
  {path: 'insert_imei_modal', component: InsertImeiModalComponent},
  {path: 'update_imei_modal', component: UpdateImeiModalComponent},
  {path: 'delete_imei_modal', component: DeleteImeiModalComponent},
  {path: 'imeis_list', component:  ImeisListComponent},
  {path: 'login', component: LoginComponent},
  {path: 'update_password_modal', component: UpdatePasswordModalComponent},
  {path: 'users_role', component: UsersRoleComponent},
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
    ImeisListComponent,
    FilterPipe,
    FilterUsersPipe,
    FilterImeisPipe,
    UpdatePasswordModalComponent,
    UsersRoleComponent,
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
    ImeisListService,
    UpdatePasswordModalService,
    UserRolesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
