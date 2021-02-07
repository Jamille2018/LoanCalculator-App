import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientsComponent } from './components/clients/clients.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import { ClientAddEditComponent } from './components/client-add-edit/client-add-edit.component';


const routes: Routes = [
  { path: '', component: ClientsComponent, pathMatch: 'full' },
  { path: 'client/:id', component: ClientDetailsComponent },
  { path: 'add', component: ClientAddEditComponent },
  { path: 'client/edit/:id', component: ClientAddEditComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
