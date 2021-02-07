import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { AppComponent } from './app.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import { ClientAddEditComponent } from './components/client-add-edit/client-add-edit.component';
import { AppRoutingModule } from './app-routing.module';
import { ClientService } from './services/client.service';

@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent,
    ClientDetailsComponent,
    ClientAddEditComponent
  ],
  imports: [
   BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
  ],
  providers: [ClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
