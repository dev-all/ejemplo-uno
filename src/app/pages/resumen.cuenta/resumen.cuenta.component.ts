import { Location } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { CuentaRequest } from 'src/app/models/Cuenta/CuentaRequest';
import { ResumenCuenta } from 'src/app/models/Cuenta/ResumenCuenta';
import { CuentaServiceService } from 'src/app/services/cuenta/cuentaService.service';

@Component({
  selector: 'app-resumen.cuenta.dialog',
  templateUrl: './resumen.cuenta.component.html',
  styleUrls: ['./resumen.cuenta.component.scss'],
})
export class ResumenCuentaPage {
  nombreCliente: string;
  numeroCuenta: number;
  fechaDesde = new FormControl('');
  fechaHasta = new FormControl('');
  resumenCuenta: ResumenCuenta[] = [];
  resumenCuentaBackup: ResumenCuenta[] = [];
  pendiente: string = '0';
  saldo: number;

  displayedColumns: string[] = [
    'fecha',
    'nroComprobante',
    'debe',
    'haber',
    'saldo',
  ];

  constructor(
    private cuentaService: CuentaServiceService,
    private location: Location,
    private route: ActivatedRoute
  ) {
    this.numeroCuenta = Number.parseInt(
      this.route.snapshot.paramMap.get('numeroCuenta')
    );
    this.nombreCliente = this.route.snapshot.paramMap.get('nombreCliente');

    const request = new CuentaRequest({
      numeroCuenta: this.numeroCuenta,
    });

    const resumenPromise = this.cuentaService
      .obtenerResumen(request)
      .toPromise();

    const pendientePromise = this.cuentaService
      .obtenerPendiente(request)
      .toPromise();

    forkJoin({
      resumenPromise,
      pendientePromise,
    }).subscribe((res) => {
      var pendienteResponse = res.pendientePromise.Data;

      if (pendienteResponse) {
        this.pendiente = res.pendientePromise.Data.Pendiente.toFixed(2);
      }

      this.resumenCuenta = res.resumenPromise.Data;
      this.resumenCuentaBackup = res.resumenPromise.Data;

      if (this.resumenCuenta.length > 0) {
        this.saldo = this.resumenCuenta[this.resumenCuenta.length - 1].Saldo;
      }

      var fechaDesde = new Date();
      fechaDesde.setMonth(fechaDesde.getMonth() - 1);
      this.fechaDesde.setValue(fechaDesde);
      this.fechaHasta.setValue(new Date());

      this.buscarResumen();
    });
  }

  buscarResumen() {
    this.resumenCuenta = [];
    if (!this.fechaDesde.value || !this.fechaHasta.value) {
      this.resumenCuenta.push(...this.resumenCuentaBackup);
    }

    const desde = new Date(this.fechaDesde.value);
    const hasta = new Date(this.fechaHasta.value);

    var resumen = this.resumenCuentaBackup.filter((x) => {
      const fecha = new Date(x.Fecha);
      return (
        fecha.getTime() >= desde.getTime() && fecha.getTime() <= hasta.getTime()
      );
    });

    this.resumenCuenta.push(...resumen);
  }

  atras_click() {
    this.location.back();
  }
}
