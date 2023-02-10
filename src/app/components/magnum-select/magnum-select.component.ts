import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-magnum-select',
  templateUrl: './magnum-select.component.html',
  styleUrls: ['./magnum-select.component.scss'],
})
export class MagnumSelectComponent implements OnInit {
  @Input() text: string;

  @Input() itemSelected: number;
  @Input() options: Array<SelectOption>;
  @Input() showSearchBar: boolean;

  @Output() selectChange = new EventEmitter<number>();
  @Output() selectOpen = new EventEmitter<void>();
  @Output() filterChange = new EventEmitter<string>();

  public filterCtrl: FormControl = new FormControl();

  

  constructor() {}

  ngOnInit() {
    this.filterCtrl.valueChanges.subscribe(() => {
      this.filterChange.emit(this.filterCtrl.value.toLowerCase());
    });
  }

  onChange() {
    this.selectChange.emit(this.itemSelected);
  }

  onOpen() {
    this.selectOpen.emit();
  }
}

export class SelectOption {
  value: any;
  descriptions: string;
  alternativeDesc: string;
  constructor(init?: Partial<SelectOption>) {
    Object.assign(this, init);
  }
}
