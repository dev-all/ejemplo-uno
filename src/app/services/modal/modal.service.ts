import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private subject = new BehaviorSubject<boolean>(false);
  constructor() {}

  onModal(): Observable<boolean> {
    return this.subject.asObservable();
  }

  value() {
    return this.subject.value;
  }

  changeValue() {
    this.subject.next(!this.subject.value);
  }
}
