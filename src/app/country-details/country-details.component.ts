import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../services/countries.service';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss'],
})
export class CountryDetailsComponent implements OnInit {
  country: any;
  lang: any;

  constructor(private route: ActivatedRoute, private countryService: CountryService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const nameCommon = params.get('id');
      console.log('nameCommon: ', nameCommon)
      if (nameCommon) {
        this.countryService.getCountryByNameCommon(nameCommon).subscribe((country) => {
          this.country = country[0];
          this.lang = country[0].languages;
          console.log('lang: ', this.lang)
          console.log('country: ', this.country)
        });
      }
    });
  }

  openMapLocation(mapLocation: string): void {
    if (mapLocation) {
      window.open(mapLocation, '_blank');
    }
  }
}