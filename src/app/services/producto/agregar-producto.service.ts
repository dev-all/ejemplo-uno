import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MovimientoDepositoAgregar } from 'src/app/models/MovimientoDepositos/MovimientoDepositoAgregar';

@Injectable({
  providedIn: 'root',
})
export class AgregarProductoService {
  private subject = new BehaviorSubject<MovimientoDepositoAgregar>(null);
  constructor() {}

  onChange(): Observable<MovimientoDepositoAgregar> {
    return this.subject.asObservable();
  }

  value() {
    return this.subject.value;
  }

  changeValue(value: MovimientoDepositoAgregar) {
    this.subject.next(value);
  }

  resetValues() {
    this.subject = new BehaviorSubject<MovimientoDepositoAgregar>(null);
  }
}
