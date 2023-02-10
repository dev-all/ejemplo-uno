import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-bonificacion.general-dialog',
  templateUrl: './bonificacion.general-dialog.component.html',
  styleUrls: ['./bonificacion.general-dialog.component.scss'],
})
export class BonificacionGeneralDialogComponent {
  bonificacionFormControl = new FormControl();
  bonificacionMax: number;
  constructor(
    private dialogRegf: MatDialogRef<BonificacionGeneralDialogComponent>,
    private userService: UserService
  ) {
    const userValues = this.userService.getUserValue();

    if (userValues) this.bonificacionMax = userValues.bonificacionMax;
  }

  aplicar_Click() {
    this.dialogRegf.close(this.bonificacionFormControl.value);
  }
}
