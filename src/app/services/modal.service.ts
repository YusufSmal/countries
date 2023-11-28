import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CountryModalComponent } from '../country-modal/country-modal.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private dialog: MatDialog) {}

  openCountryModal(country: any): Observable<any> {
    const dialogRef = this.dialog.open(CountryModalComponent, {
      width: '500px',
      data: { country },
    });
    return dialogRef.afterClosed();
  }
}