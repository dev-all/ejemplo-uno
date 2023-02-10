import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { BonificacionComercialRequest } from 'src/app/models/Bonificacion/BonificacionComercialRequest';
import { BonificacionOfertaRequest } from 'src/app/models/Bonificacion/BonificacionOfertaRequest';
import { BonificacionService } from 'src/app/services/bonificacion/bonificacion.service';
import { UserService } from 'src/app/services/user/user.service';
import { BonificacionGeneralDialogComponent } from '../bonificacion.general-dialog/bonificacion.general-dialog.component';

@Component({
  selector: 'app-bonificacion.item-dialog',
  templateUrl: './bonificacion.item-dialog.component.html',
  styleUrls: ['./bonificacion.item-dialog.component.scss'],
})
export class BonificacionItemDialogComponent {
  bonificacionFormControl = new FormControl();
  bonificacionMax: number;
  bonificacionComercial: number;
  bonificacionOferta: number;
  constructor(
    private dialogRegf: MatDialogRef<BonificacionGeneralDialogComponent>,
    private userService: UserService,
    private bonificacionService: BonificacionService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    const userValues = this.userService.getUserValue();

    if (userValues) this.bonificacionMax = userValues.bonificacionMax;

    const comercialRequest = new BonificacionComercialRequest({
      cpInterno: this.data.cpInterno,
      numeroCuenta: this.data.numeroCuenta,
      cantidad: this.data.cantidad,
    });

    const ofertaRequest = new BonificacionOfertaRequest({
      cpInterno: this.data.cpInterno,
      cantidad: this.data.cantidad,
    });

    const bonificacionComercialPromise =
      this.bonificacionService.obtenerComercial(comercialRequest);

    const bonificacionOfertaPromise =
      this.bonificacionService.obtenerOferta(ofertaRequest);

    forkJoin({
      bonificacionComercialPromise,
      bonificacionOfertaPromise,
    }).subscribe((res) => {
      this.bonificacionComercial =
        res.bonificacionComercialPromise.Data.Porcentaje;
      this.bonificacionOferta = res.bonificacionOfertaPromise.Data.Porcentaje;
    });
  }

  aplicar_Click() {
    this.dialogRegf.close(this.bonificacionFormControl.value);
  }
}
