import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductoByCodigoRequest } from 'src/app/models/Producto/ProductoByCodigoRequest';
import { ProductoByCodigoResponse } from 'src/app/models/Producto/ProductoByCodigoResponse';
import { ProductoService } from 'src/app/services/producto/producto.service';

@Component({
  selector: 'app-producto.dialog',
  templateUrl: './producto.dialog.component.html',
  styleUrls: ['./producto.dialog.component.scss'],
})
export class ProductoDialogComponent {
  productos: ProductoByCodigoResponse[];
  clickedRows = new Set<ProductoByCodigoResponse>();
  columnasTabla: string[] = ['codigo', 'descripcion', 'lista1'];
  constructor(
    private productoService: ProductoService,
    private dialogRef: MatDialogRef<ProductoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    var request = new ProductoByCodigoRequest({ codigo: this.data.codigo });
    this.productoService
      .getProductosByCodigo(request)
      .subscribe((x) => (this.productos = x.Data));
  }
  row_Cick(row: any) {
    this.clickedRows.clear();
    this.clickedRows.add(row);
  }

  aceptar_Click() {
    var productoSeleccionado: ProductoByCodigoResponse;
    this.clickedRows.forEach((x) => (productoSeleccionado = x));
    

    this.dialogRef.close(productoSeleccionado);
  }
}
