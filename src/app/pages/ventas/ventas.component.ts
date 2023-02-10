import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin, of, Subscription } from 'rxjs';
import { max } from 'rxjs/operators';
import { AgregarProductoDialogComponent } from 'src/app/components/dialogs/agregar-producto-dialog/agregar-producto-dialog.component';
import { BonificacionGeneralDialogComponent } from 'src/app/components/dialogs/bonificacion.general-dialog/bonificacion.general-dialog.component';
import { BonificacionItemDialogComponent } from 'src/app/components/dialogs/bonificacion.item-dialog/bonificacion.item-dialog.component';
import { ClienteDialogComponent } from 'src/app/components/dialogs/cliente-dialog/cliente-dialog.component';
import { LoginDialogComponent } from 'src/app/components/dialogs/login.dialog/login.dialog.component';
import { MessageDialogComponent } from 'src/app/components/dialogs/message.dialog/message.dialog.component';
import { PedidoMercaderiaDialogComponent } from 'src/app/components/dialogs/pedido.mercaderia.dialog/pedido.mercaderia.dialog.component';
import { ProductoDialogComponent } from 'src/app/components/dialogs/producto.dialog/producto.dialog.component';
import { SeleccionProductosComponent } from 'src/app/components/dialogs/seleccion-productos/seleccion-productos.component';
import { SelectOption } from 'src/app/components/magnum-select/magnum-select.component';
import { BonificacionComercialRequest } from 'src/app/models/Bonificacion/BonificacionComercialRequest';
import { BonificacionOfertaRequest } from 'src/app/models/Bonificacion/BonificacionOfertaRequest';
import { ClienteCuentaRequest } from 'src/app/models/Cliente/ClienteCuentaRequest';
import { ClienteCuentaResponse } from 'src/app/models/Cliente/ClienteCuentaResponse';
import { ClienteEntrega } from 'src/app/models/ClienteEntrega/ClienteEntrega';
import { ComprobanteCabeceraRequest } from 'src/app/models/Comprobante/ComprobanteCabeceraRequest';
import { ComprobanteDetalleRequest } from 'src/app/models/Comprobante/ComprobanteDetalleRequest';
import { Formas } from 'src/app/models/Formas/Formas';
import { Lista } from 'src/app/models/Lista/Lista';
import { PedidoMercaderiaRequest } from 'src/app/models/Mercaderia/PedidoMercaderiaRequest';
import { AgregarProducto } from 'src/app/models/Producto/AgregarProducto';
import { ProductoCostosRequest } from 'src/app/models/Producto/ProductoCostosRequest';
import { ProductoRequest } from 'src/app/models/Producto/ProductoRequest';
import { ProductoVentaGrid } from 'src/app/models/Producto/ProductoVentaGrid';
import { ProductoVentaGridRequest } from 'src/app/models/Producto/ProductoVentaGridRequest';
import { ProductoVentaRequest } from 'src/app/models/Producto/ProductoVentaRequest';
import { ProductoVentas } from 'src/app/models/Producto/ProductoVentas';
import { RequestBase } from 'src/app/models/RequestBase';
import { Seccion } from 'src/app/models/Seccion/Seccion';
import { StockReponse } from 'src/app/models/Stock/StockInicialReponse';
import { StockRequest } from 'src/app/models/Stock/StockRequest';
import { TipoFactura } from 'src/app/models/TipoFactura/TipoFactura';
import { Transporte } from 'src/app/models/Transporte/Transporte';
import { Vendedor } from 'src/app/models/Vendedor/Vendedor';
import { BonificacionService } from 'src/app/services/bonificacion/bonificacion.service';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { GenericCrudService } from 'src/app/services/generic-crud.service';
import { AgregarProductoService } from 'src/app/services/producto/agregar-producto.service';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { StockService } from 'src/app/services/stock/stock.service';
import { UserService } from 'src/app/services/user/user.service';
import { VendedorService } from 'src/app/services/vendedor/vendedor.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss'],
})
export class VentasComponent implements OnInit {
  @ViewChild('cantidad') cantidadElement: ElementRef;
  clientFormControl = new FormControl();
  cantidadFormControl = new FormControl(1);
  codigoFormControl = new FormControl();
  observacionesFormControl = new FormControl();
  tipoComprobanteSelected: number;
  tipoComprobantesSelect: Array<SelectOption> = [];
  condicionSelect: Array<SelectOption> = [];
  formasVentaSelect: Array<SelectOption> = [];
  listaSelect: Array<SelectOption> = [];
  vendedorSelect: Array<SelectOption> = [];
  transporteSelect: Array<SelectOption> = [];
  formaEntregaSelect: Array<SelectOption> = [];
  lugarSelect: Array<SelectOption> = [];
  tipoDocumentosSelect: Array<SelectOption> = [];
  descripcionesSelect: Array<SelectOption> = [];

  descripcionSelected: number;
  descripciones: Array<SelectOption> = [];
  vendedores: Vendedor[] = [];
  clienteCuenta: ClienteCuentaResponse = new ClienteCuentaResponse();
  productosGrid: ProductoGrid[] = [];
  columnasTabla: string[] = [
    'cantidad',
    'codigo',
    'unitario',
    'bonif',
    'descripcion',
    'optionX',
    'parcial',
    'stock',
    'iva',
    'neto',
  ];
  secciones: Seccion[];
  tipoFacturas: TipoFactura[];
  formas: Formas[];
  listas: Lista[];
  transportes: Transporte[];
  clienteEntregas: ClienteEntrega[];

  condicionSelected: number;
  formaSelected: number;
  listaSelected: number;
  productosVentas: ProductoVentas[];
  productoSelected: ProductoVentas;
  totalParcial: string = '0';
  subTotal: number = 0;
  totalBonificacion: number = 0;
  totalIva: string = '0';
  clienteCuentaDefault = -1;
  buscarPorDetalle: boolean = true;
  nuevoMovimeintoSubscription: Subscription;
  bonificacionUsuario: number = 0;

  constructor(
    private seccionService: GenericCrudService<Seccion>,
    private tipoFacturaService: GenericCrudService<TipoFactura>,
    private formasService: GenericCrudService<Formas>,
    private listaService: GenericCrudService<Lista>,
    private transporteService: GenericCrudService<Transporte>,
    private clienteEntregaService: GenericCrudService<ClienteEntrega>,
    private vendedorService: VendedorService,
    private clienteService: ClienteService,
    private productoService: ProductoService,
    private dialog: MatDialog,
    private userService: UserService,
    private stockService: StockService,
    private nuevoMovimientoService: AgregarProductoService,
    private bonificacionService: BonificacionService
  ) {
    this.vendedorSelect.push(
      new SelectOption({ value: 0, descriptions: 'USUARIO ACTUAL' })
    );
    this.loadData();
  }

  ngOnInit() {
    this.nuevoMovimeintoSubscription = this.nuevoMovimientoService
      .onChange()
      .subscribe((value) => {
        if (!value) return;
        this.agregarProductoSuscription(value.CpInterno, value.Cantidad);
      });
  }

  ngOnDestroy() {
    this.nuevoMovimeintoSubscription.unsubscribe();
    this.nuevoMovimientoService.resetValues();
  }

  async loadData() {
    var baseRequest = new RequestBase({ database: null });

    var seccionesPromise = this.seccionService.obtener(baseRequest, 'seccion');
    var tipoFacturaPromise = this.tipoFacturaService.obtener(
      baseRequest,
      'tipoFactura'
    );
    var formasPromise = this.formasService.obtener(baseRequest, 'formas');
    var listaPromise = this.listaService.obtener(baseRequest, 'lista');
    var transportePromise = this.transporteService.obtener(
      baseRequest,
      'transporte'
    );
    var clienteEntregaPromise = this.clienteEntregaService.obtener(
      baseRequest,
      'clienteEntrega'
    );

    var vendedorPromise = this.vendedorService.obtener(baseRequest);

    var clienteCuentaRequest = new ClienteCuentaRequest({
      cuenta: this.clienteCuentaDefault,
      database: null,
    });

    var clienteCuentaPromise = this.clienteService
      .obtenerClienteCuenta(clienteCuentaRequest)
      .toPromise();

    forkJoin({
      seccionesPromise,
      tipoFacturaPromise,
      formasPromise,
      listaPromise,
      transportePromise,
      clienteEntregaPromise,
      vendedorPromise,
      clienteCuentaPromise,
    }).subscribe((res) => {
      this.secciones = res.seccionesPromise.Data;
      this.tipoFacturas = res.tipoFacturaPromise.Data;
      this.formas = res.formasPromise.Data;
      this.listas = res.listaPromise.Data;
      this.transportes = res.transportePromise.Data;
      this.clienteEntregas = res.clienteEntregaPromise.Data;
      this.vendedores = res.vendedorPromise.Data;
      this.clienteCuenta = res.clienteCuentaPromise.Data;

      this.secciones.forEach((seccion) => {
        this.tipoComprobantesSelect.push(
          new SelectOption({
            value: seccion.Id,
            descriptions: seccion.Seccion1,
            alternativeDesc: seccion.Detalle,
          })
        );
      });

      this.tipoFacturas.forEach((tipoFactura) => {
        this.condicionSelect.push(
          new SelectOption({
            value: tipoFactura.CodigoFactura,
            descriptions: tipoFactura.Condicion,
          })
        );
      });

      this.formas.forEach((forma) => {
        this.formasVentaSelect.push(
          new SelectOption({
            value: forma.Id,
            descriptions: forma.Expresion,
          })
        );
      });

      this.listas.forEach((lista) => {
        if (lista.Habil.toLowerCase() === 'si')
          this.listaSelect.push(
            new SelectOption({
              value: lista.Id,
              descriptions: lista.Aclaracion,
            })
          );
      });

      this.vendedores.forEach((vendedor) => {
        this.vendedorSelect.push(
          new SelectOption({
            value: vendedor.Id,
            descriptions: vendedor.Nombre,
          })
        );
      });

      this.transportes.forEach((transporte) => {
        this.transporteSelect.push(
          new SelectOption({
            value: transporte.Id,
            descriptions: transporte.RazonSocial,
          })
        );
      });

      this.clienteEntregas.forEach((clienteEntrega) => {
        this.formaEntregaSelect.push(
          new SelectOption({
            value: clienteEntrega.Id,
            descriptions: clienteEntrega.Direccion,
          })
        );
      });

      this.clientFormControl.setValue(this.clienteCuenta.Nombre);
      this.listaSelected = this.clienteCuenta.IdLista;
      this.tipoDocumentosSelect = this.getTiposDocumento();
    });
  }

  async buscarCliente_Click(event: boolean) {
    var clienteDialog = this.dialog.open(ClienteDialogComponent, {
      width: '1000px',
    });

    var data = await clienteDialog.afterClosed().toPromise();

    var clienteCuenta = await this.getClienteCuenta(data.cuenta);

    this.clienteCuenta = clienteCuenta;
    this.clientFormControl.setValue(this.clienteCuenta.Nombre);
    this.lista_Change(this.clienteCuenta.IdLista);
  }

  async resetCliente_Click() {
    if (this.clienteCuenta.Cuenta === this.clienteCuentaDefault) return;

    var clienteCuenta = await this.getClienteCuenta(this.clienteCuentaDefault);

    this.clienteCuenta = clienteCuenta;
    this.clientFormControl.setValue(this.clienteCuenta.Nombre);
    this.lista_Change(this.clienteCuenta.IdLista);
  }

  async getProductosVentas(value: string = null) {
    this.descripcionesSelect = [];
    var request = new ProductoVentaRequest({
      database: null,
      detalle: value,
    });

    var productosVentas = await this.productoService
      .getProductosVentas(request)
      .toPromise();

    this.productosVentas = productosVentas.Data;

    productosVentas.Data.forEach((producto) => {
      this.descripcionesSelect.push(
        new SelectOption({
          value: producto.CpInterno,
          descriptions: `${producto.Detalle}`,
          alternativeDesc: producto.Lista1.toString(),
        })
      );
    });
  }

  async addProducto() {
    if (this.codigoFormControl.value) {
      if (!this.cantidadFormControl.value) return;
      this.productoSelected = new ProductoVentas();
      var cpInterno = await this.getCpInternoFromCodigo();

      if (cpInterno) this.productoSelected.CpInterno = cpInterno;
      else {
        var dialogResult = await this.obtenerCodigosFromDialog();
        this.productoSelected.CpInterno = dialogResult;
      }
    }

    if (!this.productoSelected.CpInterno) return;

    var user = this.userService.getUserValue();

    var productoRequest = new ProductoVentaGridRequest({
      cpInterno: this.productoSelected.CpInterno,
      numeroDeposito: user.deposito,
      tipoLista: this.listaSelected,
    });

    const stockRequest = new StockRequest({
      cpInterno: this.productoSelected.CpInterno,
    });

    const productoResponse = (
      await this.productoService
        .getProductoVentaGrid(productoRequest)
        .toPromise()
    ).Data;

    const stockResponse = await this.stockService
      .getStock(stockRequest)
      .toPromise();

    if (this.codigoFormControl.value) {
      this.addProductoGrilla(
        this.cantidadFormControl.value,
        productoResponse,
        user.deposito
      );
    } else {
      this.addProductoGrillaDesdeModal(
        productoResponse,
        stockResponse,
        user.deposito
      );
    }

    this.cantidadFormControl.setValue(1);
    this.codigoFormControl.reset();
  }

  async getCpInternoFromCodigo() {
    var request = new ProductoRequest({
      page: 1,
      pageSize: 3,
      codigo: this.codigoFormControl.value,
      orderby: 'CP_INTERNO',
    });
    var productoResponse = await this.productoService
      .getByFiltros(request)
      .toPromise();

    var producto = productoResponse.Data.Productos;

    if (producto.length === 0) {
      return null;
    }

    return producto[0].CpInterno;
  }

  productosChange(value: number) {
    var selected = this.productosVentas.find((x) => x.CpInterno === value);
    this.productoSelected = selected;
  }

  deleteProductoGrid(currentProducto: any) {
    var productosGrid = this.productosGrid.filter(
      (x) => x.NumItem !== currentProducto.NumItem
    );

    this.productosGrid = [...productosGrid];

    this.sumTotales();
  }

  sumTotales() {
    var total = this.productosGrid.reduce(
      (previous, current) => previous + current.Parcial,
      0
    );

    var subtotal = this.productosGrid.reduce((previous, current) => {
      return previous + current.Neto * current.Cantidad;
    }, 0);

    var totalBonificacion = this.productosGrid.reduce(
      (previous, current) =>
        previous + (current.Bonificacion / 100) * current.NetoBackup,
      0
    );

    var totalIva = this.productosGrid.reduce(
      (previous, current) =>
        previous + (current.Iva / 100) * (current.Neto * current.Cantidad),
      0
    );

    this.totalBonificacion = -Math.abs(totalBonificacion).toFixed(2);

    this.subTotal = subtotal;
    this.totalIva = totalIva.toFixed(2);

    this.totalParcial = total.toFixed(2);
  }

  async imprimir() {
    if (this.productosGrid.length === 0) return;

    if (this.checkBonificaciones()) {
      this.dialog.open(MessageDialogComponent, {
        data: {
          title: 'Bonificación máxima superada',
          message:
            'Alguno de los productos excede la bonificación máxima permitida',
        },
      });

      return;
    }

    const loginDialog = this.dialog.open(LoginDialogComponent, {
      width: '500px',
      height: '500px',
    });

    const dialogResult = await loginDialog.afterClosed().toPromise();

    if (!dialogResult) {
      return;
    }

    var comprobanteDetalle: ComprobanteDetalleRequest[] = [];
    this.productosGrid.forEach((producto, index) => {
      let costoPro = (
        producto.Costo -
        (producto.Bonificar * producto.Costo) / 100
      ).toFixed(4);

      comprobanteDetalle.push(
        new ComprobanteDetalleRequest({
          codigo: producto.Codigo,
          familia: producto.Familia,
          cantidad: producto.Cantidad,
          despachar: 0,
          predetalle: producto.Descripcion,
          unitario: producto.Unitario,
          costopro: Number.parseFloat(costoPro),
          descuento: producto.Bonificacion,
          parcial: producto.Parcial,
          unidad: producto.Unidad,
          sucursal: 0,
          fecha: new Date(),
          pactado: 0,
          bonificar: 0,
          valorneto: producto.Neto,
          impuesto: 0,
          recargo: 0,
          cambiar: '',
          aclaracion: '',
          grupofam: 0,
          bajostock: '',
          cpinterno: producto.CpInterno,
          nroitem: index + 1,
          moneda: 0,
          globaldesc: 0,
          fechaega: new Date(),
          completo: 0,
          idvariante: producto.IdVariante,
          deposito: producto.Deposito,
        })
      );
    });

    const pedidoMercaderiaRequest = new PedidoMercaderiaRequest({
      comprobanteCabecera: new ComprobanteCabeceraRequest({
        tipocbte: 1,
        fecha: new Date(),
        cuenta: this.clienteCuenta.Cuenta,
        importe: Number.parseFloat(this.totalParcial),
        nombre: this.clienteCuenta.Nombre,
        listpre: this.listaSelected,
        numcity: this.clienteCuenta.IdCiudad,
        ciudad: this.clienteCuenta.Ciudad,
        direccion: this.clienteCuenta.Direccion,
        facturado: '',
        oferta: '',
        pedido: '',
        factura: 0,
        remito: 0,
        cotizado: '',
        discrimina: 0,
        incluyeiva: 0,
        infcontab: '',
        detalle: '',
        numprovi: this.clienteCuenta.IdProvincia,
        idpais: 0,
        idlote: '',
        mercadopagoid: 0,
        sucursal: 0,
        web: 0,
      }),
      comprobantesDetalle: comprobanteDetalle,
    });

    const mercaderiaDialog = this.dialog.open(PedidoMercaderiaDialogComponent, {
      width: '600px',
      data: { pedidoMercaderiaRequest },
    });

    const mercaderiaDialogResult = await mercaderiaDialog
      .afterClosed()
      .toPromise();

    if (!mercaderiaDialogResult) return;

    this.resetData();
  }

  async lista_Change(value: number) {
    this.listaSelected = value;

    if (this.productosGrid.length === 0) return;

    let cpInternos: number[] = [];

    this.productosGrid.forEach((x) => cpInternos.push(x.CpInterno));

    const request = new ProductoCostosRequest({
      cpInternos: cpInternos,
      tipoLista: this.listaSelected,
    });

    var productosCostos = (
      await this.productoService.getProductosCostos(request).toPromise()
    ).Data;

    this.productosGrid.forEach(async (producto) => {
      var productoCosto = productosCostos.find(
        (x) => x.CpInterno === producto.CpInterno
      );

      const bonif = await this.calcularBonificacion(
        producto.CpInterno,
        producto.Cantidad,
        producto.BonificacionUsuario
      );

      producto.Neto = productoCosto.ListaX;
      producto.NetoBackup = productoCosto.ListaX;

      producto.Iva = productoCosto.Iva;
      var unitario =
        (producto.Iva / 100) * producto.NetoBackup + producto.NetoBackup;
      producto.Unitario = unitario;
      producto.UnitarioBackup = unitario;

      var parcial = this.getParcial(unitario, producto.Cantidad);
      producto.Unitario = this.getUnitario(producto.UnitarioBackup, bonif);

      producto.Neto = this.getNeto(producto.NetoBackup, bonif);
      producto.Parcial = parcial - (bonif / 100) * parcial;
      producto.Bonificacion = bonif;

      this.sumTotales();
    });
  }

  async bonificacionGeneral_Click() {
    var dialog = this.dialog.open(BonificacionGeneralDialogComponent);

    var dialogResult = await dialog.afterClosed().toPromise();
    if (!dialogResult) return;
    const productosGrid = [...this.productosGrid];

    productosGrid.forEach(async (producto) => {
      var bonif = await this.calcularBonificacion(
        producto.CpInterno,
        producto.Cantidad,
        dialogResult
      );

      producto.BonificacionUsuario = dialogResult;
      var unitario =
        (producto.Iva / 100) * producto.NetoBackup + producto.NetoBackup;
      producto.Unitario = unitario;
      producto.UnitarioBackup = unitario;

      var parcial = this.getParcial(unitario, producto.Cantidad);
      producto.Unitario = this.getUnitario(producto.UnitarioBackup, bonif);

      producto.Neto = this.getNeto(producto.NetoBackup, bonif);
      producto.Parcial = parcial - (bonif / 100) * parcial;
      producto.Bonificacion = bonif;
      this.productosGrid = [...productosGrid];

      this.sumTotales();
    });
  }

  async bonificacion_Click(producto: ProductoGrid) {
    console.log(producto);
    var dialog = this.dialog.open(BonificacionItemDialogComponent, {
      data: {
        cpInterno: producto.CpInterno,
        numeroCuenta: this.clienteCuenta.Cuenta,
        cantidad: producto.Cantidad,
      },
    });

    var dialogResult = await dialog.afterClosed().toPromise();
    if (!dialogResult) return;

    producto.BonificacionUsuario = dialogResult;
    var bonif = await this.calcularBonificacion(
      producto.CpInterno,
      producto.Cantidad,
      producto.BonificacionUsuario
    );

    var unitario =
      (producto.Iva / 100) * producto.NetoBackup + producto.NetoBackup;
    producto.Unitario = unitario;
    producto.UnitarioBackup = unitario;

    console.log('unitario', producto.Unitario);
    console.log('unitarioBackup', producto.UnitarioBackup);

    var parcial = this.getParcial(producto.UnitarioBackup, producto.Cantidad);
    producto.Unitario = this.getUnitario(producto.UnitarioBackup, bonif);
    producto.Neto = this.getNeto(producto.NetoBackup, bonif);
    producto.Parcial = parcial - (bonif / 100) * parcial;
    producto.Bonificacion = bonif;

    this.sumTotales();
  }

  detalleCodigo_Click() {
    this.buscarPorDetalle = !this.buscarPorDetalle;

    this.descripcionesSelect = null;
    this.descripcionSelected = null;
    this.productoSelected = null;

    this.codigoFormControl.reset();
  }

  async seleccionProductos_Click() {
    this.dialog.open(SeleccionProductosComponent, {
      width: '1000px',
    });
  }

  private async agregarProductoSuscription(
    cpInterno: number,
    cantidad: number
  ) {
    this.productoSelected = new ProductoVentas();

    this.productoSelected.CpInterno = cpInterno;

    var user = this.userService.getUserValue();
    var productoRequest = new ProductoVentaGridRequest({
      cpInterno: this.productoSelected.CpInterno,
      numeroDeposito: user.deposito,
      tipoLista: this.listaSelected,
    });

    const productoResponse = (
      await this.productoService
        .getProductoVentaGrid(productoRequest)
        .toPromise()
    ).Data;

    this.addProductoGrilla(cantidad, productoResponse, user.deposito);
  }

  private checkBonificaciones() {
    var bonificacionMaxima = this.userService.getUserValue().bonificacionMax;

    var existeBonifiacionMax = this.productosGrid.find(
      (x) => x.Bonificacion > bonificacionMaxima
    );

    return existeBonifiacionMax != null;
  }

  private async getClienteCuenta(cuenta: number) {
    var clienteCuentaRequest = new ClienteCuentaRequest({
      cuenta,
      database: null,
    });

    return (
      await this.clienteService
        .obtenerClienteCuenta(clienteCuentaRequest)
        .toPromise()
    ).Data;
  }

  private getTiposDocumento() {
    var tiposDocumentos: SelectOption[] = [];
    tiposDocumentos.push(
      new SelectOption({ value: 1, descriptions: 'PEDIDO DE MERCADERIA' })
    );
    return tiposDocumentos;
  }

  private async resetData() {
    this.productosGrid = [];

    this.totalBonificacion = 0;

    this.subTotal = 0;
    this.totalIva = '0';

    this.totalParcial = '0';
    this.observacionesFormControl.setValue('');

    var clienteCuentaRequest = new ClienteCuentaRequest({
      cuenta: this.clienteCuentaDefault,
      database: null,
    });

    var clienteCuentaPromise = await this.clienteService
      .obtenerClienteCuenta(clienteCuentaRequest)
      .toPromise();

    this.clienteCuenta = clienteCuentaPromise.Data;
  }

  private addProductoGrillaDesdeModal(
    productoResponse: ProductoVentaGrid,
    stockResponse: StockReponse,
    deposito: number
  ) {
    var agregarProducto = new AgregarProducto({
      descripcion: productoResponse.Detalle,
      precio: productoResponse.Unitario,
      stockActual: productoResponse.StkActual,
      stocks: stockResponse.ProductosStock,
    });
    this.dialog
      .open(AgregarProductoDialogComponent, {
        disableClose: true,
        data: { agregarProducto },
      })
      .afterClosed()
      .subscribe((cantidad) => {
        if (!cantidad) return;
        this.addProductoGrilla(cantidad, productoResponse, deposito);
      });
  }

  private async addProductoGrilla(
    cantidad: number,
    productoResponse: ProductoVentaGrid,
    depositoUsuario: number
  ) {
    var ventasgrid: ProductoGrid[] = [];
    if (productoResponse.StkActual < productoResponse.StkMinimo) {
      var dialogRef = this.dialog.open(MessageDialogComponent, {
        data: {
          title: 'Advertencia',
          message: 'STOCK CRITICO',
        },
      });

      dialogRef.afterClosed().subscribe(() => {
        if (this.cantidadElement) this.cantidadElement.nativeElement.focus();
      });
    }
    var bonif = await this.calcularBonificacion(
      productoResponse.CpInterno,
      cantidad,
      0
    );

    var parcial = this.getParcial(productoResponse.Unitario, cantidad);

    productoResponse.Unitario = this.getUnitario(
      productoResponse.Unitario,
      bonif
    );

    productoResponse.Neto = this.getNeto(productoResponse.Neto, bonif);

    ventasgrid.push(
      new ProductoGrid({
        NumItem: this.productosGrid.length,
        Cantidad: cantidad,
        Codigo: productoResponse.Codigo,
        Unitario: productoResponse.Unitario,
        UnitarioBackup: productoResponse.Unitario,
        Bonificacion: bonif,
        BonificacionUsuario: 0,
        Descripcion: productoResponse.Detalle,
        Parcial: parcial - (bonif / 100) * parcial,
        Stock: productoResponse.StkActual,
        Iva: productoResponse.Iva,
        Neto: productoResponse.Neto,
        Costo: productoResponse.Costo,
        Bonificar: productoResponse.Bonificar,
        NetoBackup: productoResponse.Neto,
        CpInterno: productoResponse.CpInterno,
        Deposito: depositoUsuario,
      })
    );

    this.productosGrid = [...this.productosGrid, ...ventasgrid];
    if (this.cantidadElement) this.cantidadElement.nativeElement.focus();
    this.sumTotales();
  }

  private async obtenerCodigosFromDialog() {
    var productoDialogResult = await this.dialog
      .open(ProductoDialogComponent, {
        data: { codigo: this.codigoFormControl.value },
        width: '700px',
      })
      .afterClosed()
      .toPromise();

    return productoDialogResult.CpInterno;
  }

  private async calcularBonificacion(
    cpInterno: number,
    cantidad: number,
    bonif_user: number
  ) {
    const numeroCuenta = this.clienteCuenta.Cuenta;
    const comercialRequest = new BonificacionComercialRequest({
      cpInterno,
      numeroCuenta,
      cantidad,
    });

    const ofertaRequest = new BonificacionOfertaRequest({
      cpInterno,
      cantidad,
    });

    const bonificacionComercialPromise =
      this.bonificacionService.obtenerComercial(comercialRequest);

    const bonificacionOfertaPromise =
      this.bonificacionService.obtenerOferta(ofertaRequest);

    var resPromises = await forkJoin({
      bonificacionComercialPromise,
      bonificacionOfertaPromise,
    }).toPromise();

    const bonifComercial =
      resPromises.bonificacionComercialPromise.Data.Porcentaje;
    const bonifOferta = resPromises.bonificacionOfertaPromise.Data.Porcentaje;

    var lnbonif = await of(bonifComercial, bonifOferta).pipe(max()).toPromise();

    var descuento = 100 - 100 * (1 - lnbonif / 100) * (1 - bonif_user / 100);

    return descuento;
  }

  private getParcial(unitario: number, cantidad: number) {
    return unitario * cantidad;
  }

  private getUnitario(unitario: number, bonif: number) {
    return unitario - (bonif / 100) * unitario;
  }

  private getNeto(neto: number, bonif: number) {
    return neto - (bonif / 100) * neto;
  }
}

class ProductoGrid {
  NumItem: number;
  Cantidad: number;
  Codigo: string;
  Unitario: number;
  UnitarioBackup: number;
  Bonificacion: number;
  BonificacionUsuario: number;
  Descripcion: string;
  OptionX: string;
  Parcial: number;
  Stock: number;
  Iva: number;
  Neto: number;
  NetoBackup: number;
  CpInterno: number;
  Deposito: number;
  Familia: string;
  IdVariante: number;
  Unidad: string;
  Costo: number;
  Bonificar: number;

  constructor(init?: Partial<ProductoGrid>) {
    Object.assign(this, init);
  }
}
