import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CountryService } from '../services/countries.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss'],
})
export class CountryListComponent implements OnInit, AfterViewInit {
  countries: any[] = [];
  displayedColumns: string[] = [
    'flag',
    'coatOfArms',
    'name',
    'region',
    'favorite',
  ];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  favoriteCountries: any[] = [];

  constructor(
    private countryService: CountryService,
    private router: Router,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.countryService.getCountries().subscribe((data) => {
      this.countries = data;
      console.log(this.countries[0]);
      this.dataSource = new MatTableDataSource(this.countries);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

      const storedFavorites = localStorage.getItem('favoriteCountries');
      this.favoriteCountries = storedFavorites
        ? JSON.parse(storedFavorites)
        : [];
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openCountryModal(country: any): void {
    const dialogRef = this.modalService.openCountryModal(country);

    dialogRef.subscribe((result) => {
      if (result) {
        console.log('Modal result:', result);
        this.isFavorite(result);
      }
    });
  }

  toggleFavorite(country: any): void {
    const index = this.favoriteCountries.findIndex(
      (fav) => fav.name === country.name.common
    );

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

  isFavorite(country: any): boolean {
    return this.favoriteCountries.some(
      (fav) => fav.name === country.name.common
    );
  }

  navigateToFavorites(): void {
    this.router.navigate(['/favorites']);
  }
}
