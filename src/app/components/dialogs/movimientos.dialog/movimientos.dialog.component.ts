import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Deposito } from '@models/Deposito/Deposito';
import { DepositoRequest } from '@models/Deposito/DepositoRequest';
import { Movimiento } from '@models/Movimientos/Movimiento';
import { MovimientoRequest } from '@models/Movimientos/MovimientoRequest';
import { Producto } from '@models/Producto/Producto';
import { ReporteBase } from '@models/Reporte/ReporteBase';
import { ReporteRequestMovimiento } from '@models/Reporte/ReporteRequestMovimiento';
import { TipoReporte } from '@models/Reporte/TipoReporte.enum';
import { StockRequest } from '@models/Stock/StockRequest';
import { Variante } from '@models/Variante/Variante';
import { VarianteRequest } from '@models/Variante/VarianteRequest';
import { DepositoService } from '@services/deposito/deposito.service';
import { MovimientoService } from '@services/movimiento/movimiento.service';
import { ReporteService } from '@services/reporte/reporte.service';
import { VarianteService } from '@services/variante/variante.service';

@Component({
  selector: 'app-movimientos.dialog',
  templateUrl: './movimientos.dialog.component.html',
  styleUrls: ['./movimientos.dialog.component.scss'],
})
export class MovimientosDialogComponent {
  dialogData: Producto;
  descripcionProducto: string;
  movimientos: Movimiento[] = [];
  stockComprometido: number;
  stockInicial: number;
  stockActual: number;
  totalVentas: number;
  totalCompras: number;
  totalAjustes: number;
  fechaDesde = new FormControl('');
  fechaHasta = new FormControl('');
  depositoSelected: number;
  varianteSelected: number;
  depositos: Deposito[];
  variantes: Variante[] = [];
  variantesDb: Variante[] = [];

  displayedColumns: string[] = [
    'fecha',
    'tipo',
    'cantidad',
    'detalle',
    'actual',
    'nombre',
    'usuario',
    'deposito',
    'vencimiento',
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private movimientoService: MovimientoService,
    private reporteService: ReporteService,
    private router: Router,
    private depositoService: DepositoService,
    private varianteService: VarianteService
  ) {
    this.dialogData = this.data.producto;
    this.descripcionProducto = this.dialogData.Detalle;

    var fechaDesde = new Date();
    fechaDesde.setMonth(fechaDesde.getMonth() - 7);

    this.fechaDesde.setValue(fechaDesde);
    this.fechaHasta.setValue(new Date());

    var requestDeposito = new DepositoRequest({ database: null });
    const varianteRequest = new VarianteRequest({
      database: null,
      cpInterno: this.dialogData.CpInterno,
    });

    const varianteServ = this.varianteService.getByCpInterno(varianteRequest);

    const depositoServ = this.depositoService.obtenerDepositos(requestDeposito);

    forkJoin({ varianteServ, depositoServ }).subscribe((res) => {
      this.depositos = res.depositoServ.Depositos;
      this.variantes = res.varianteServ.Data;
      this.variantesDb = res.varianteServ.Data;
      this.depositos.push(new Deposito({ Numero: 0, Detalle: 'TODOS' }));
      this.variantesDb.push(
        new Variante({ IdVariante: 0, DetalleVariante: 'TODOS' })
      );

      this.seleccionarVariante();
      this.seleccionarDeposito();
      /*Seleccionar variante y deposito que viene desde productos*/
      this.buscarMovimiento();
    });
  }

  buscarMovimiento() {
    if (!this.fechaDesde.value || !this.fechaHasta.value) {
      return;
    }
    var movimientoRequest = new MovimientoRequest({
      fechaDesde: this.fechaDesde.value,
      fechaHasta: this.fechaHasta.value,
      cpInterno: this.dialogData.CpInterno,
      idDeposito: this.depositoSelected !== 0 ? this.depositoSelected : null,
      idVariante: this.varianteSelected !== 0 ? this.varianteSelected : null,
    });

    movimientoRequest.fechaDesde.setHours(0, 0, 0, 0);
    movimientoRequest.fechaHasta.setHours(0, 0, 0, 0);

    this.movimientoService
      .obtenerMovimientos(movimientoRequest)
      .subscribe((response) => {
        this.movimientos = response.Data.Movimientos;
        this.stockComprometido = response.Data.StockComprometido;
        this.stockInicial = response.Data.StockInicial;
        this.stockActual = response.Data.StockActual;
        this.totalVentas = response.Data.TotalVentas;
        this.totalCompras = response.Data.TotalCompras;
        this.totalAjustes = response.Data.TotalAjustes;
      });
  }

  imprimir() {
    var reporteRequest = new ReporteRequestMovimiento({
      nombreProducto: this.dialogData.Detalle,
      movimientos: this.movimientos,
      stockInicial: this.stockInicial,
      totalCompras: this.totalCompras,
      totalVentas: this.totalVentas,
      totalAjustes: this.totalAjustes,
      stockActual: this.stockActual,
      formatoArchivo: 'pdf',
    });

    var reporteBase = new ReporteBase({
      nombreArchivo: `MOVIMIENDO - ${this.dialogData.Detalle.toUpperCase()} `,
      formatoArchivo: 'pdf',
      reporteRequest: reporteRequest,
      tipoReporte: TipoReporte.movimiento,
    });

    this.reporteService.setReportCache(reporteBase);

    this.movimientos.forEach((movimiento) => {
      movimiento.Fecha = movimiento.Fecha
        ? movimiento.Fecha.split(' ')[0]
        : null;
    });

    this.reporteService
      .generarReporteMovimiento(reporteBase.reporteRequest)
      .subscribe((reponse) => {
        let baseUrl = window.location.href.replace(this.router.url, '');
        var url = this.router.createUrlTree(['/pdf-viewer', reponse.Data, 1]);
        window.open(baseUrl + url, '_blank');
      });
  }

  private seleccionarVariante() {
    if (this.dialogData.IdVariante === 0) {
      this.variantesDb = [];
      this.variantes = [];

      return;
    }

    const varianteSeleccionar = this.variantesDb.find(
      (x) => x.IdVariante === this.dialogData.IdVariante
    );

    if (varianteSeleccionar)
      this.varianteSelected = varianteSeleccionar.IdVariante;
    else this.varianteSelected = 0;
  }

  private seleccionarDeposito() {
    if (this.dialogData.Deposito !== 0) {
      const depositoSeleccionar = this.depositos.find(
        (x) => x.Numero === this.dialogData.Deposito
      );

      if (depositoSeleccionar)
        this.depositoSelected = depositoSeleccionar.Numero;
      else this.depositoSelected = 0;
    }
  }
}
