import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Fondo } from 'src/app/models/Fondo/Fondo';
import { Imputacion } from 'src/app/models/Imputacion/Imputacion';
import { ReciboCuentaItem } from 'src/app/models/Recibo/Recibo';
import { RequestBase } from 'src/app/models/RequestBase';
import { Vendedor } from 'src/app/models/Vendedor/Vendedor';
import { VendedorService } from 'src/app/services/vendedor/vendedor.service';
import { Location } from '@angular/common';
import { UserService } from 'src/app/services/user/user.service';
import { GenericCrudService } from 'src/app/services/generic-crud.service';
import { NumeroFormulario } from 'src/app/models/NumeroFormulario/NumeroFormulario';
import { CuentaServiceService } from 'src/app/services/cuenta/cuentaService.service';
import { CuentaRequest } from 'src/app/models/Cuenta/CuentaRequest';

@Component({
  selector: 'app-ReciboCuentaCorriente',
  templateUrl: './recibo-cuenta-corriente.html',
  styleUrls: ['./recibo-cuenta-corriente.scss'],
})
export class ReciboCuentaCorrientePage implements OnInit {
  nombreCliente: string;
  fechaFormControl = new FormControl();
  cantidadFormControl = new FormControl('');
  optionFormControl = new FormControl('');
  agendaObservacionFormControl = new FormControl('');
  imputacionFechaDesdeFormControl = new FormControl();
  imputacionFechaHastaFormControl = new FormControl();

  cobradorSelected: number;
  talonarioSelected: number;
  vendedores: Vendedor[] = [];
  reciboDataSource: ReciboCuentaItem[] = [];
  fondoDataSource: Fondo[] = [];
  imputacionDataSource: Imputacion[] = [];
  numeroCuenta: number;
  fechaActual = new Date();
  numerosFormularios: NumeroFormulario[];
  totalResumen: number = 0;
  totalMontoIncluido: number = 0;
  totalSaldo: number = 0;
  totalDescuento: number = 0;
  totalRegarco: number = 0;

  columnasTablaGeneral: string[] = [
    'fecha',
    'tipoFact',
    'tipoComprobante',
    'puntoVenta',
    'numero',
    'importe',
    'imputado',
    'descuentoPorcentaje',
    'descuentoMoneda',
    'entrega',
    'marcar',
  ];

  columnasTablaFondos: string[] = [
    'tipo',
    'banco',
    'numero',
    'vence',
    'cuotas',
    'importe',
  ];

  columnasTablaImputacion: string[] = [
    'fecha',
    'comprobante',
    'importe',
    'imputado',
  ];

  @ViewChildren('marcaCheckBox') private marcaCheckBox: QueryList<any>;

  constructor(
    private vendedorService: VendedorService,
    private location: Location,
    private route: ActivatedRoute,
    private userService: UserService,
    private numeroFormularioService: GenericCrudService<NumeroFormulario>,
    private cuentaService: CuentaServiceService
  ) {
    this.numeroCuenta = Number.parseInt(
      this.route.snapshot.paramMap.get('numeroCuenta')
    );
    this.nombreCliente = this.route.snapshot.paramMap.get('nombreCliente');
    this.optionFormControl.setValue('general');
    var baseRequest = new RequestBase({ database: null });
    var vendedorPromise = this.vendedorService.obtener(baseRequest);
    var numeroFormularioPromise = this.numeroFormularioService.obtener(
      baseRequest,
      'numerosFormularios'
    );

    var cuentaRequest = new CuentaRequest({ numeroCuenta: this.numeroCuenta });

    var reciboItemsPromise =
      this.cuentaService.obtenerReciboCuentaItems(cuentaRequest);
    var reciboTotalPromise =
      this.cuentaService.obtenerReciboCuentaTotal(cuentaRequest);

    forkJoin({
      vendedorPromise,
      numeroFormularioPromise,
      reciboItemsPromise,
      reciboTotalPromise,
    }).subscribe((res) => {
      this.vendedores = res.vendedorPromise.Data;
      this.numerosFormularios = res.numeroFormularioPromise.Data;
      const vendedor = this.userService.getUserValue();
      this.cobradorSelected = vendedor.Id;

      this.reciboDataSource = res.reciboItemsPromise.Data;
      this.totalSaldo = res.reciboTotalPromise.Data;
    });
  }

  ngOnInit() {
    console.log(this.marcaCheckBox);
  }

  option_Change() {
    console.log(this.optionFormControl.value);
  }

  atras_click() {
    this.location.back();
  }

  marcar_click(reciboItem: ReciboCuentaItem, checkBox: any) {
    let marcaCheckBoxArray = this.marcaCheckBox.toArray();

    const reciboIndex = this.reciboDataSource.findIndex(
      (x) => x.Interno == reciboItem.Interno
    );

    if (checkBox.checked) {
      marcaCheckBoxArray[reciboIndex].checked = true;
      this.reciboDataSource[reciboIndex].Entrega = 0;
      this.handleItemUnCheck(reciboItem);
    } else {
      marcaCheckBoxArray[reciboIndex].checked = false;
      this.reciboDataSource[reciboIndex].Entrega = reciboItem.Importe;

      this.handleItemCheck(reciboItem);
    }
  }

  private handleItemCheck(reciboItem: ReciboCuentaItem) {
    if (reciboItem.Signo === 'D') {
      this.totalMontoIncluido = this.totalMontoIncluido + reciboItem.Importe;
      this.totalSaldo = this.totalSaldo - reciboItem.Importe;
      this.totalResumen = this.totalResumen + reciboItem.Importe;
    }

    if (reciboItem.Signo === 'H') {
      this.totalMontoIncluido = this.totalMontoIncluido - reciboItem.Importe;
      this.totalSaldo = this.totalSaldo + reciboItem.Importe;
      this.totalResumen = this.totalResumen - reciboItem.Importe;
    }
  }

  private handleItemUnCheck(reciboItem: ReciboCuentaItem) {
    if (reciboItem.Signo === 'D') {
      this.totalMontoIncluido = this.totalMontoIncluido - reciboItem.Importe;
      this.totalSaldo = this.totalSaldo + reciboItem.Importe;
      this.totalResumen = this.totalResumen - reciboItem.Importe;
    }

    if (reciboItem.Signo === 'H') {
      this.totalMontoIncluido = this.totalMontoIncluido + reciboItem.Importe;
      this.totalSaldo = this.totalSaldo - reciboItem.Importe;
      this.totalResumen = this.totalResumen + reciboItem.Importe;
    }
  }
}
