import { Component, OnInit } from '@angular/core';
import { GlobalSpinnerService } from 'src/app/services/global.spinner/global.spinner.service';

@Component({
  selector: 'app-global-spinner',
  templateUrl: './global.spinner.component.html',
  styleUrls: ['./global.spinner.component.scss'],
})
export class GlobalSpinnerComponent implements OnInit {
  showSpinner: boolean;
  constructor(private spinnerService: GlobalSpinnerService) {}

  ngOnInit() {
    this.spinnerService
      .onSpinner()
      .subscribe((spinner) => (this.showSpinner = spinner));
  }
}
