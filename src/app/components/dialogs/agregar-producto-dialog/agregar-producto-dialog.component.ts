import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MovimientoDepositoAgregar } from '@models/MovimientoDepositos/MovimientoDepositoAgregar';
import { AgregarProducto } from '@models/Producto/AgregarProducto';
import { SeleccionProducto } from '@models/SeleccionProducto/SeleccionProducto';
import { AgregarProductoService } from '@services/producto/agregar-producto.service';

@Component({
  selector: 'app-agregar-producto-dialog',
  templateUrl: './agregar-producto-dialog.component.html',
  styleUrls: ['./agregar-producto-dialog.component.scss'],
})
export class AgregarProductoDialogComponent implements OnInit {
  cantidadFormControl = new FormControl(1);
  dialogData: AgregarProducto;
  constructor(
    public dialogRef: MatDialogRef<AgregarProductoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.dialogData = this.data.agregarProducto;
  }

  ngOnInit() {}

  agregarProducto() {
    this.dialogRef.close(this.cantidadFormControl.value)
  }
}
