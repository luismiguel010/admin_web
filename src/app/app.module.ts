import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { UsersService } from './services/users.service';

import { AppComponent } from './app.component';
import { OptionsComponent } from './pages/options/options.component';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './pages/users/users.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { InsertImeiModalComponent } from './modals/insert-imei-modal/insert-imei-modal.component';

const routes: Routes = [
  {path: '', redirectTo: '/users', pathMatch: 'full'},
  {path: 'users', component: UsersComponent},
  {path: 'insert_imei_modal', component: InsertImeiModalComponent},
  {path: 'options', component: OptionsComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    OptionsComponent,
    UsersComponent,
    HeaderComponent,
    FooterComponent,
    InsertImeiModalComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes ),
    FormsModule
  ],
  providers: [
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
