import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-magnum-input',
  templateUrl: './magnum-input.component.html',
  styleUrls: ['./magnum-input.component.scss'],
})
export class MagnumInputComponent implements OnInit {
  @Input() inputFormControl: FormControl;
  @Input() placeHolder: string;
  @Input() errorMessage: string;
  @Input() type = 'text';
  @Input() ref: string;

  @Output() inputChange = new EventEmitter<string>();
  @Output() keyupEnter = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  input_Change(event: any) {
    this.inputChange.emit(event.target.value);
  }

  keyUpEnter(event: any) {
    this.keyupEnter.emit(event.target.value);
  }
}
