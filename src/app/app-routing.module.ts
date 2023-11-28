import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryListComponent } from './country-list/country-list.component';
import { FavoritesPageComponent } from './favorites-page/favorites-page.component';
import { CountryDetailsComponent } from './country-details/country-details.component';

const routes: Routes = [
  { path: 'country-list', component: CountryListComponent },
  { path: 'country-details/:id', component: CountryDetailsComponent },
  { path: 'favorites', component: FavoritesPageComponent },

  // {path: '**', component: CountryListComponent},
  {path: '', redirectTo: 'country-list', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
