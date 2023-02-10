import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SnackBar } from 'src/app/models/SnackBar/SnackBar';

@Injectable({
  providedIn: 'root',
})
export class GlobalSnackbarService {
  private subject = new BehaviorSubject<SnackBar>(new SnackBar());

  constructor() {}

  onSnackBar(): Observable<SnackBar> {
    return this.subject.asObservable();
  }

  value() {
    return this.subject.value;
  }

  showSnackBar(mensaje: string, action: string = 'Cerrar') {
    this.subject.next(new SnackBar({ mensaje, action }));
  }

  resetSnackBar() {
    this.subject.next(new SnackBar());
  }
}
