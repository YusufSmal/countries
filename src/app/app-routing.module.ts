import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryListComponent } from './country-list/country-list.component';

const routes: Routes = [
  {path: 'country-list', component: CountryListComponent},

  {path: '**', component: CountryListComponent},
  {path: '', redirectTo: 'country-list', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
