import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

export class SnackbarService {

  constructor(private snackBar: MatSnackBar) {}

  show(message: string, action: string = '', duration: number = 3000) {
    const config: MatSnackBarConfig = {
      duration,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    };

    this.snackBar.open(message, action, config);
  }

  success(message: string, action: string = '', duration: number = 3000) {
    this.showStyled(message, action, duration, 'snackbar-success');
  }

  error(message: string, action: string = '', duration: number = 3000) {
    this.showStyled(message, action, duration, 'snackbar-error');
  }

  private showStyled(message: string, action: string, duration: number, panelClass: string) {
    this.snackBar.open(message, action, {
      duration,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass
    });
  }
}
