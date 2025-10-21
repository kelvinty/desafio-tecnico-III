import { Component } from '@angular/core';
import { loadingService } from '../../../services/loading/loading-service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-progress-spinner',
  imports: [MatProgressSpinnerModule,CommonModule],
  templateUrl: './progress-spinner.html',
  styleUrl: './progress-spinner.scss'
})
export class ProgressSpinner {
  loading:Observable<boolean>;

  constructor(public spinnerService: loadingService) {
    this.loading = this.spinnerService.loading$;
  }
}
