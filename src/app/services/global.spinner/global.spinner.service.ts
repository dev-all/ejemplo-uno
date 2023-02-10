import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalSpinnerService {
  private subject = new BehaviorSubject<boolean>(false);

  onSpinner(): Observable<boolean> {
    return this.subject.asObservable();
  }

  value() {
    return this.subject.value;
  } 
  
  showSpinner() {
    this.subject.next(true);
  }

  hideSpinner() {
    this.subject.next(false);
  }
}
