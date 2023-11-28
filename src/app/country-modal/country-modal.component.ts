import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-country-modal',
  templateUrl: './country-modal.component.html',
  styleUrls: ['./country-modal.component.scss'],
})
export class CountryModalComponent implements OnInit {
  favoriteCountries: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<CountryModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { country: any }
  ) {}

  ngOnInit(): void {
    const storedFavorites = localStorage.getItem('favoriteCountries');
    this.favoriteCountries = storedFavorites ? JSON.parse(storedFavorites) : [];
  }

  toggleFavorite(country: any): void {
    const index = this.favoriteCountries.findIndex( 
      (fav) => fav.name === country.name.common );

    if (index !== -1) {
      this.favoriteCountries.splice(index, 1);
    } else {
      this.favoriteCountries.push({
        name: country.name.common,
      });
    }

    localStorage.setItem(
      'favoriteCountries',
      JSON.stringify(this.favoriteCountries)
    );
  }

  closeModal(result: any = null): void {
    this.dialogRef.close(result);
  }

  isFavorite(country: any): boolean {
    return this.favoriteCountries.some(
      (fav) => fav.name === country.name.common
    );
  }
}
