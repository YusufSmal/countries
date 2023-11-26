import { Component, OnInit } from '@angular/core';
import { CountryService } from '../services/countries.service';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss'],
})
export class CountryListComponent implements OnInit {
  countries: any[] = [];

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    this.countryService.getCountries().subscribe((data) => {
      this.countries = data;
      console.log('countties: ', this.countries[0])
    });
  }
}