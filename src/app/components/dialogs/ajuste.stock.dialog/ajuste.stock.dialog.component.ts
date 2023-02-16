import { Component, Inject, OnInit } from '@angular/core';
import { StockService } from '@services/stock/stock.service';
import { Stock } from '@models/Stock/StockInicial';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StockRequest } from '@models/Stock/StockRequest';
import { FormControl } from '@angular/forms';
import { RegistroService } from '@services/registro/registro.service';
import { Registro } from '@models/Registro/Registro';
import { UserService } from '@services/user/user.service';
import { MessageDialogComponent } from '../message.dialog/message.dialog.component';
import { Deposito } from '@models/Deposito/Deposito';
import { VarianteService } from '@services/variante/variante.service';
import { VarianteRequest } from '@models/Variante/VarianteRequest';
import { Variante } from '@models/Variante/Variante';
import { ModalService } from '@services/modal/modal.service';
import { Producto } from '@models/Producto/Producto';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-ajuste.stock.dialog',
  templateUrl: './ajuste.stock.dialog.component.html',
  styleUrls: ['./ajuste.stock.dialog.component.scss'],
})
export class AjusteStockDialogComponent {
  depositos: Deposito[] = [];
  variantes: Variante[] = [];
  variantesDb: Variante[];
  stocks: Stock[];
  descripcionProducto: string;
  depositoSelected: number = 1;
  varianteSelected: number = 0;
  tipoAjuste: string = '1';
  iconoAjuste: number = 1;
  stockActual: number;
  stockFinal: number = 0;
  cantidadAjuste: number = 0;
  cantidadFormControl = new FormControl('');
  descripcionFormControl = new FormControl('');
  spanDeposito = false;
  bloquearRadios = false;
  selectIdStock: number;
  dialogData: Producto;
  displayedColumns: string[] = [
    'deposito',
    'stockActual',
    'minimo',
    'maximo',
    'ubicación',
    'variante',
  ];

  constructor(
    private stockService: StockService,
    private registroService: RegistroService,
    private userService: UserService,
    private dialog: MatDialog,
    private varianteService: VarianteService,
    private modalService: ModalService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.dialogData = this.data.producto;
    this.descripcionProducto = this.dialogData.Detalle;

    this.obtenerStock();
  }

  createRegistro() {
    if (this.variantes.length > 0 && !this.varianteSelected) {
      this.dialog.open(MessageDialogComponent, {
        data: {
          message: 'Debe seleccionar una variante',
          title: 'Advertencia',
        },
      });

      return;
    }

    if (
      this.cantidadFormControl.value == 0 ||
      !this.cantidadFormControl.value
    ) {
      this.dialog.open(MessageDialogComponent, {
        data: {
          message: 'La cantidad debe ser mayor a 0',
        },
      });
      return;
    }

    const registro = new Registro({
      Cantidad: this.cantidadAjuste,
      Tipo: this.iconoAjuste,
      Descripcion: this.descripcionFormControl.value,
      CpInterno: this.dialogData.CpInterno,
      Deposito: this.depositoSelected,
      Vendedor: this.userService.getUserValue().Id,
      idVariante: this.varianteSelected,
    });

    this.registroService.createRegistro(registro).subscribe(
      () => {
        this.modalService.changeValue();
        this.obtenerStock();
        this.limpiarFiltros();
      },
      (err) => {
        const errorStatus = err.error.Error.Status;

        if (errorStatus === 2) {
          this.dialog.open(MessageDialogComponent, {
            data: {
              message: 'No existe en stock el ajuste que desea realizar',
            },
          });
        } else {
          this.dialog.open(MessageDialogComponent, {
            data: {
              message: 'Hubo un error en realizar el ajuste',
            },
          });
        }
      }
    );
  }

  calcularTipoAjuste() {
    if (!this.cantidadFormControl.value) {
      this.cantidadAjuste = 0;
      return;
    }

    switch (this.tipoAjuste) {
      case '1':
        this.sumarStock();
        break;
      case '2':
        this.restarStock();
        break;
      case '3':
        this.calcularEstablecer();
        break;
    }
  }

  calcularValores(tipo: string) {
    this.limpiarFiltros();
    switch (tipo) {
      case 'deposito':
        this.varianteSelected = undefined;
        this.seleccionarVariantes();
        this.stockActual = 0;
        this.cantidadAjuste = 0;
        this.stockFinal = 0;
        this.bloquearInputs();
        if (this.variantes.length === 0) {
          this.calcularStockActual();
          this.habilitarInputs();
          this.selectGridStock();
        }
        break;
      case 'variante':
        this.calcularStockActual();
        this.habilitarInputs();
        this.selectGridStock();
        this.stockFinal = this.stockActual;
        break;
    }
  }

  private obtenerStock() {
    const stockInicialRequest = new StockRequest({
      cpInterno: this.dialogData.CpInterno,
    });

    const stockService = this.stockService.getStock(stockInicialRequest);

    const varianteRequest = new VarianteRequest({
      cpInterno: this.dialogData.CpInterno,
    });

    const varianteService =
      this.varianteService.getByCpInterno(varianteRequest);

    forkJoin({ stockService, varianteService }).subscribe((res) => {
      this.stocks = res.stockService.ProductosStock;
      this.depositos = res.stockService.ProductosStock.map(
        (stock) => stock.DetalleDeposito
      );

      this.variantes = res.varianteService.Data;
      this.variantesDb = res.varianteService.Data;
      this.stockActual = this.stocks.find(
        (stock) => stock.DetalleDeposito.Numero === this.depositoSelected
      )?.StkActual;

      this.stockFinal = this.stockActual;

      if (this.depositos.length > 0) {
        const depositoSeleccionado = this.depositos.find(
          (x) => x.Numero === this.dialogData.Deposito
        );

        if (depositoSeleccionado) {
          this.depositoSelected = depositoSeleccionado.Numero;
        }
      }

      if (this.variantes.length > 0) {
        const varianteSeleccionada = this.variantesDb.find(
          (x) => x.IdVariante === this.dialogData.IdVariante
        );

        if (varianteSeleccionada)
          this.varianteSelected = varianteSeleccionada.IdVariante;

        this.spanDeposito = true;
        this.seleccionarVariantes();
      } else {
        this.spanDeposito = false;
      }

      this.selectGridStock();
      this.calcularStockActual();
    });
  }

  private seleccionarVariantes() {
    const variantesEnStock = this.stocks
      .filter((x) => x.DetalleDeposito.Numero === this.depositoSelected)
      .map((x) => x.IdVariante);

    const variantesTag = new Set(variantesEnStock);

    this.variantes = this.variantesDb.filter((v) =>
      variantesTag.has(v.IdVariante)
    );
  }

  private bloquearInputs() {
    this.cantidadFormControl.disable();
    this.descripcionFormControl.disable();
    this.bloquearRadios = true;
  }

  private habilitarInputs() {
    this.cantidadFormControl.enable();
    this.descripcionFormControl.enable();
    this.bloquearRadios = false;
  }

  private calcularStockActual() {
    console.log(this.varianteSelected)
    if (this.varianteSelected) {
      this.stockActual = this.stocks.find(
        (stock) =>
          stock.DetalleDeposito.Numero === this.depositoSelected &&
          stock.IdVariante === this.varianteSelected
      ).StkActual;
      this.stockFinal = this.stockActual;
      return;
    }

    this.stockActual = this.stocks.find(
      (stock) => stock.DetalleDeposito.Numero === this.depositoSelected
    ).StkActual;

    this.stockFinal = this.stockActual;
  }

  private sumarStock() {
    const cantidad = this.cantidadFormControl.value;

    this.stockFinal = this.stockActual + cantidad;
    this.iconoAjuste = 1;
    this.cantidadAjuste = cantidad;
  }

  private restarStock() {
    const cantidad = this.cantidadFormControl.value;

    this.stockFinal = this.stockActual - cantidad;
    this.iconoAjuste = 2;
    this.cantidadAjuste = cantidad;
  }

  private calcularEstablecer() {
    const cantidad = this.cantidadFormControl.value;

    if (cantidad > this.stockActual) {
      this.cantidadAjuste = cantidad - this.stockActual;
      this.stockFinal = cantidad;
      this.iconoAjuste = 1;
    }

    if (cantidad < this.stockActual) {
      this.cantidadAjuste = this.stockActual - cantidad;
      this.stockFinal = cantidad;
      this.iconoAjuste = 2;
    }
  }

  private limpiarFiltros() {
    this.cantidadFormControl.reset();
    this.descripcionFormControl.reset();
    this.tipoAjuste = '1';
    this.iconoAjuste = 1;
    this.cantidadAjuste = 0;
  }

  private selectGridStock() {
    if (this.variantes.length > 0) {
      this.selectIdStock = this.stocks.find(
        (x) =>
          x.DetalleDeposito.Numero === this.depositoSelected &&
          x.IdVariante === this.varianteSelected
      ).IdStock;

      return;
    }

    this.selectIdStock = this.stocks.find(
      (x) => x.DetalleDeposito.Numero === this.depositoSelected
    )?.IdStock;
  }
}
