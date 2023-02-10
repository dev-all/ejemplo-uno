import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  appVersion = environment.appVersion;

  constructor() {    
    localStorage.removeItem('appVersion');
    localStorage.setItem('appVersion', this.appVersion);
  }
}
