import { Component, OnInit } from '@angular/core';
import { CountryService } from '../services/countries.service';

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.scss']
})
export class FavoritesPageComponent implements OnInit {
  favoriteCountries: any[] = [];
  detailedCountryInfo: any[] = [];

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    this.loadFavoriteCountries();
  }

  loadFavoriteCountries(): void {
    const storedFavorites = localStorage.getItem('favoriteCountries');
    this.favoriteCountries = storedFavorites ? JSON.parse(storedFavorites) : [];

    this.favoriteCountries.forEach((country: any) => {
      this.countryService.getCountryByNameCommon(country.name).subscribe(
        (details) => {
          this.detailedCountryInfo.push(details[0]);
        },
        (error) => {
          console.error(`Error fetching details for ${country.name}:`, error);
        }
      );
    });
  }

  removeFromFavorites(country: any): void {
    this.favoriteCountries = this.favoriteCountries.filter((fav) => fav.name !== country.name.common);
    localStorage.setItem('favoriteCountries', JSON.stringify(this.favoriteCountries));

    this.detailedCountryInfo = this.detailedCountryInfo.filter((details) => details.name !== country.name);
  }

  isFavorite(country: any): boolean {
    return this.favoriteCountries.some((fav) => fav.name === country.name.common);
  }
}