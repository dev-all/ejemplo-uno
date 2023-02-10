import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { UserService } from 'src/app/services/user/user.service';
import { MessageDialogComponent } from '../message.dialog/message.dialog.component';

@Component({
  selector: 'app-confirmation.dialog',
  templateUrl: './confirmation.dialog.component.html',
  styleUrls: ['./confirmation.dialog.component.scss'],
})
export class ConfirmationDialogComponent implements OnInit {
  title: string;
  text: string;
  hideCancelButton: boolean;
  btnPrimaryText: string;
  btnSecondaryText: string;

  constructor(
    public thisDialogRef: MatDialogRef<ConfirmationDialogComponent>,
    public userService: UserService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // var allowed = this.userService.getUserAccess('BORRssAR');    
    // if (!allowed) {
    //   this.dialog.open(MessageDialogComponent, {
    //     data: {
    //       message: 'No se encutra autorizado para eliminar productos',
    //       title: 'No autorizado',
    //     },
    //     width: '400px',
    //   });

    //   return;
    // }

    if (data) {
      this.title = data.title ? data.title : '';
      this.text = data.text ? data.text : '';
      this.hideCancelButton = data.hideCancelButton
        ? data.hideCancelButton
        : false;
      this.btnPrimaryText = data.btnPrimaryText
        ? data.btnPrimaryText
        : 'Aceptar';
      this.btnSecondaryText = data.btnSecondaryText
        ? data.btnSecondaryText
        : 'Cancelar';
    } else {
      this.title = '';
      this.text = '';
      this.hideCancelButton = false;
      this.btnPrimaryText = 'Aceptar';
      this.btnSecondaryText = 'Cancelar';
    }
  }

  ngOnInit() {}

  onCloseConfirm() {
    this.thisDialogRef.close('Confirm');
  }

  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  }
}
