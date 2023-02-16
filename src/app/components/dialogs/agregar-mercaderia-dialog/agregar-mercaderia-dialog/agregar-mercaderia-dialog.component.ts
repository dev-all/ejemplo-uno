import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MercaderiaRequest } from '@models/Mercaderia/MercaderiaRequest';
import { MercaderiaService } from '@services/mercaderia/mercancia.service';

@Component({
  selector: 'app-agregar-mercaderia-dialog',
  templateUrl: './agregar-mercaderia-dialog.component.html',
  styleUrls: ['./agregar-mercaderia-dialog.component.scss'],
})
export class AgregarMercaderiaDialogComponent implements OnInit {
  fechaDesde = new FormControl('');
  fechaHasta = new FormControl('');
  idDeposito: number;
  constructor(
    public dialogRef: MatDialogRef<AgregarMercaderiaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private mercaderiaService: MercaderiaService
  ) {}

  ngOnInit() {
    this.idDeposito = this.data.idDeposito;
  }

  async aceptar_Click() {
    if (
      !this.fechaDesde.value ||
      !this.fechaHasta.value ||
      this.fechaDesde.errors ||
      this.fechaHasta.errors
    ) {
      return;
    }

    const request = new MercaderiaRequest({
      FechaDesde: this.fechaDesde.value,
      FechaHasta: this.fechaHasta.value,
      NumeroDeposito: this.idDeposito,
    });

    const mercaderias = await this.mercaderiaService
      .obtener(request)
      .toPromise();

    this.dialogRef.close(mercaderias.Data);
  }
}
