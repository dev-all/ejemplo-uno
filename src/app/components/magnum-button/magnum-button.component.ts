import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-magnum-button',
  templateUrl: './magnum-button.component.html',
  styleUrls: ['./magnum-button.component.scss'],
})
export class MagnumButtonComponent implements OnInit {
  @Output() btnClickEmt: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() text: string;
  @Input() type: string;
  constructor() {}

  ngOnInit() {}

  onBtnClick() {
    this.btnClickEmt.emit(true);
  }
}
