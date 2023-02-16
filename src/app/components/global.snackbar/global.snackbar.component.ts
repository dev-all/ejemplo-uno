import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { SnackBar } from '@models/SnackBar/SnackBar';
import { GlobalSnackbarService } from '@services/global.snackbar/global.snackbar.service';

@Component({
  selector: 'app-global-snackbar',
  templateUrl: './global.snackbar.component.html',
  styleUrls: ['./global.snackbar.component.scss'],
})
export class GlobalSnackbarComponent implements OnInit {
  snackBarModel: SnackBar;
  snakSubscription: Subscription;
  constructor(
    private snackBarService: GlobalSnackbarService,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.snakSubscription = this.snackBarService
      .onSnackBar()
      .subscribe((snackBar) => {
        if (snackBar.mensaje)
          this.snackBar.open(snackBar.mensaje, snackBar.action, {
            duration: 2000,
          });
      });
  }

  ngOnDestroy() {
    this.snackBarService.resetSnackBar();
    this.snakSubscription.unsubscribe();
  }
}
