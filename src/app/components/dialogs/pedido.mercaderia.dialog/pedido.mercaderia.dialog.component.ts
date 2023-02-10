import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ciudad } from 'src/app/models/Ciudad/Ciudad';
import { PedidoMercaderiaRequest } from 'src/app/models/Mercaderia/PedidoMercaderiaRequest';
import { RequestBase } from 'src/app/models/RequestBase';
import { ComprobanteService } from 'src/app/services/comprobante/comprobante.service';
import { GenericCrudService } from 'src/app/services/generic-crud.service';
import { GlobalSnackbarService } from 'src/app/services/global.snackbar/global.snackbar.service';

@Component({
  selector: 'app-pedido.mercaderia.dialog',
  templateUrl: './pedido.mercaderia.dialog.component.html',
  styleUrls: ['./pedido.mercaderia.dialog.component.scss'],
})
export class PedidoMercaderiaDialogComponent implements OnInit {
  estados: EstadosPedido[] = [];
  estadoSelected: string;
  localidadSelected: number;
  nombreClienteFormControl = new FormControl();
  direccionFormControl = new FormControl();
  tlfFormControl = new FormControl();
  correoFormControl = new FormControl();
  solicitadoPorFormControl = new FormControl();
  plazoFormControl = new FormControl();
  condicionPagoFormControl = new FormControl();
  lugarEntregaFormControl = new FormControl();
  transportadoPorFormControl = new FormControl();
  aclaracionFormControl = new FormControl();
  observacionFormControl = new FormControl();

  ciudades: Ciudad[] = [];
  dialogData: PedidoMercaderiaRequest;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private ciudadService: GenericCrudService<Ciudad>,
    private comprobanteService: ComprobanteService,
    private dialogRef: MatDialogRef<PedidoMercaderiaDialogComponent>,
    private snackbarService: GlobalSnackbarService
  ) {
    this.dialogData = this.data.pedidoMercaderiaRequest;
    var baseRequest = new RequestBase({ database: null });

    this.ciudadService.obtener(baseRequest, 'ciudad').subscribe((x) => {
      this.ciudades = x.Data;
      this.localidadSelected = this.dialogData.comprobanteCabecera.numcity;
    });

    this.estados.push(
      new EstadosPedido({ valor: 'A', descripcion: 'Activo' }),
      new EstadosPedido({ valor: 'P', descripcion: 'Pagado' }),
      new EstadosPedido({ valor: 'I', descripcion: 'Picking Iniciado' }),
      new EstadosPedido({ valor: 'K', descripcion: 'Picking Finalizado' }),
      new EstadosPedido({ valor: 'F', descripcion: 'Facturado' }),
      new EstadosPedido({ valor: 'E', descripcion: 'Entregado' }),
      new EstadosPedido({ valor: 'C', descripcion: 'Cancelado' })
    );

    this.nombreClienteFormControl.setValue(
      this.dialogData.comprobanteCabecera.nombre
    );

    this.direccionFormControl.setValue(
      this.dialogData.comprobanteCabecera.direccion
    );

    this.tlfFormControl.setValue('111 /');

    this.estadoSelected = 'A';
  }

  ngOnInit() {}

  async aceptar_Click() {
    var request = this.dialogData;
    var ciudadSelected = this.ciudades.find(
      (x) => x.Id === this.localidadSelected
    );
    request.comprobanteCabecera.nombre = this.nombreClienteFormControl.value;
    request.comprobanteCabecera.direccion = this.direccionFormControl.value;
    request.comprobanteCabecera.ciudad = ciudadSelected.Ciudad;
    request.comprobanteCabecera.telefono = this.tlfFormControl.value;
    request.comprobanteCabecera.correo = this.correoFormControl.value;
    request.comprobanteCabecera.oficina = this.solicitadoPorFormControl.value;
    request.comprobanteCabecera.plazoentrega = this.plazoFormControl.value;
    request.comprobanteCabecera.condicionpago =
      this.condicionPagoFormControl.value;
    request.comprobanteCabecera.lugar = this.lugarEntregaFormControl.value;
    request.comprobanteCabecera.envio = this.transportadoPorFormControl.value;
    request.comprobanteCabecera.aclaracion = this.aclaracionFormControl.value;
    request.comprobanteCabecera.auxiliar = this.observacionFormControl.value;    
    request.comprobanteCabecera.estado = this.estadoSelected;
    request.comprobanteCabecera.tipocbte = 1;
    await this.comprobanteService
      .crearPedidoMercaderia(this.dialogData)
      .toPromise();

    this.snackbarService.showSnackBar('Pedido creado correctamente');
    this.dialogRef.close(true);
  }
}

export class EstadosPedido {
  valor: string;
  descripcion: string;
  constructor(init?: Partial<EstadosPedido>) {
    Object.assign(this, init);
  }
}
