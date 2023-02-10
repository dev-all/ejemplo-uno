import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { ChangeDetectorRef, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { GlobalSpinnerService } from '../services/global.spinner/global.spinner.service';
import { catchError, finalize } from 'rxjs/operators';
import { UserService } from '../services/user/user.service';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from '../components/dialogs/message.dialog/message.dialog.component';
import { Router } from '@angular/router';
import { GlobalSnackbarService } from '../services/global.snackbar/global.snackbar.service';
import { SnackBar } from '../models/SnackBar/SnackBar';

@Injectable({
  providedIn: 'root',
})
export class ApiInterceptorService implements HttpInterceptor {
  service_count = 0;
  constructor(
    private spinnerService: GlobalSpinnerService,
    private snackBarService: GlobalSnackbarService,
    private userService: UserService,
    private router: Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    var tokenEndpoint = req.url.split('/').find((x) => x === 'token');
    var accesoEndPoint = req.url.split('/').find((x) => x === 'getByVendedor');

    if (!tokenEndpoint && !accesoEndPoint) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.userService.getUserToken()}`,
        },
      });
    }

    this.service_count++;

    this.spinnerService.showSpinner();
    if (!this.spinnerService.value()) this.spinnerService.showSpinner();

    return next
      .handle(req)
      .pipe(
        finalize(() => {
          this.service_count--;
          if (this.service_count == 0) {
            this.spinnerService.hideSpinner();
          }
        })
      )
      .pipe(
        catchError((err: any) => {
          // this.snackBarService.showSnackBar(
          //   'Ha ocurrido un error en la comunicacion con el servidor',JSON.stringify(err)
          // );
          console.log(err)
          this.spinnerService.hideSpinner();
          this.snackBarService.showSnackBar('Error en los servicios');
          if (err.status === 401) {
            this.userService.removeUserValue();
            this.router.navigate(['login']);
          }
          return throwError(err);
        })
      );
  }
}
