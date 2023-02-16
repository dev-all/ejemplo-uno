import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Deposito } from '@models/Deposito/Deposito';
import { DepositoRequest } from '@models/Deposito/DepositoRequest';
import { Stock } from '@models/Stock/StockInicial';
import { StockRequest } from '@models/Stock/StockRequest';
import { DepositoService } from '@services/deposito/deposito.service';
import { StockService } from '@services/stock/stock.service';
import { Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VarianteService } from '@services/variante/variante.service';
import { VarianteRequest } from '@models/Variante/VarianteRequest';
import { Variante } from '@models/Variante/Variante';
import { MessageDialogComponent } from '../message.dialog/message.dialog.component';
import { Producto } from '@models/Producto/Producto';

@Component({
  selector: 'app-inicio.stock.dialog',
  templateUrl: './inicio.stock.dialog.component.html',
  styleUrls: ['./inicio.stock.dialog.component.scss'],
})
export class InicioStockDialogComponent implements OnInit {
  depositos: Deposito[];
  variantes: Variante[];
  depositoSelected: number;
  varianteSelected: number;
  descripcionProducto: string;
  spanUbicacion = true;
  cantidadFormControl = new FormControl(0);
  stockMinimoFormControl = new FormControl(0);
  stockMaximoFormControl = new FormControl(0);
  ubicacionFormControl = new FormControl('');
  displayedColumns: string[] = [
    'deposito',
    'stockActual',
    'minimo',
    'maximo',
    'ubicación',
    'variante',
  ];
  stocks: Stock[];
  dialogData: Producto;

  constructor(
    private depositoSertive: DepositoService,
    private stockService: StockService,
    private varianteService: VarianteService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.dialogData = this.data.producto;
    this.descripcionProducto = this.dialogData.Detalle;

    this.depositoSertive
      .obtenerDepositos(new DepositoRequest({ database: null }))
      .subscribe((respuesta) => {
        this.depositos = respuesta.Depositos;
      });

    const varianteRequest = new VarianteRequest({
      cpInterno: this.dialogData.CpInterno,
    });

    this.varianteService
      .getByCpInterno(varianteRequest)
      .subscribe((response) => {
        this.variantes = response.Data;

        if (this.variantes.length > 0) this.spanUbicacion = false;
        else this.spanUbicacion = true;
      });

    this.obtenerStock();
  }

  ngOnInit() {}

  addStock() {
    if (!this.depositoSelected) {
      this.dialog.open(MessageDialogComponent, {
        data: {
          message: 'Debe seleccionar un deposito',
        },
      });

      return;
    }

    if (this.variantes.length > 0 && !this.varianteSelected) {
      this.dialog.open(MessageDialogComponent, {
        data: {
          message: 'Debe seleccionar una variante',
        },
      });

      return;
    }

    const stockInicialRequest = new Stock({
      CpInterno: this.dialogData.CpInterno,
      Ubicacion: this.ubicacionFormControl.value,
      StockInicial: this.cantidadFormControl.value,
      Minimo: this.stockMinimoFormControl.value,
      Maximo: this.stockMaximoFormControl.value,
      IdVariante: this.variantes.length > 0 ? this.varianteSelected : 0,
      DetalleDeposito: new Deposito({
        Numero: this.depositoSelected,
      }),
      Horario: new Date(),
    });

    this.stockService.insertStockInicial(stockInicialRequest).subscribe(
      () => {
        this.obtenerStock();
        this.limpiarFiltros();
      },
      (err) => {
        const errorStatus = err.error.Error.Status;

        if (errorStatus === 1) {
          this.dialog.open(MessageDialogComponent, {
            data: {
              message: 'Ya existe un producto con este deposito',
            },
          });
        } else {
          this.dialog.open(MessageDialogComponent, {
            data: {
              message: 'Hubo un error en iniciar este stock',
            },
          });
        }
      }
    );
  }

  private obtenerStock() {
    const stockInicialRequest = new StockRequest({
      cpInterno: this.dialogData.CpInterno,
    });

    this.stockService.getStock(stockInicialRequest).subscribe((response) => {
      this.stocks = response.ProductosStock;
    });
  }

  private limpiarFiltros() {
    this.ubicacionFormControl.reset();
    this.depositoSelected = undefined;
    this.cantidadFormControl.reset();
    this.stockMaximoFormControl.reset();
    this.stockMinimoFormControl.reset();
    this.varianteSelected = undefined;
  }
}
