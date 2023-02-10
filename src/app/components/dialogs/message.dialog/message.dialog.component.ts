import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './message.dialog.component.html',
})
export class MessageDialogComponent implements OnInit {
  titleMessage: string;
  errorMessage: string;
  constructor(@Inject(MAT_DIALOG_DATA) private data: any) {}

  ngOnInit() {
    this.titleMessage = this.data.title;
    this.errorMessage = this.data.message;
  }
}
