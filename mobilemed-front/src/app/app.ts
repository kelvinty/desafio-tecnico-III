import { Component, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule, MatNavList } from '@angular/material/list';
import { ProgressSpinner } from './common/components/progress-spinner/progress-spinner';


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, MatToolbarModule, MatSidenavModule, MatNavList, MatListModule,RouterModule,ProgressSpinner
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('mobilemed-front');
}
