import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ClienteVentaRequest } from 'src/app/models/Cliente/ClienteVentaRequest';
import { ClienteVentaResponse } from 'src/app/models/Cliente/ClienteVentaResponse';
import { TipoBusquedadCliente } from 'src/app/models/Cliente/TipoBusquedadCliente.enum';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { SelectOption } from '../../magnum-select/magnum-select.component';

@Component({
  selector: 'app-cliente-dialog',
  templateUrl: './cliente-dialog.component.html',
  styleUrls: ['./cliente-dialog.component.scss'],
})
export class ClienteDialogComponent implements OnInit {
  valorBusquedadFormControl = new FormControl('');
  tipoBusquedadSelected: number = 0;
  tipoBusquedas: Array<SelectOption> = [];
  clientesVenta: ClienteVentaResponse[];
  textValue: string;
  columnasTabla: string[] = [
    'cuenta',
    'nombre',
    'fantasia',
    'direccion',
    'ciudad',
    'telefono',
  ];
  constructor(
    private clienteService: ClienteService,
    private clienteDialogRef: MatDialogRef<ClienteDialogComponent>
  ) {
    this.tipoBusquedas.push(
      new SelectOption({
        value: TipoBusquedadCliente.Nombre,
        descriptions: 'Nombre',
      }),
      new SelectOption({
        value: TipoBusquedadCliente.Fantasia,
        descriptions: 'Fantasia',
      }),
      new SelectOption({
        value: TipoBusquedadCliente.Direccion,
        descriptions: 'Dirección',
      }),
      new SelectOption({
        value: TipoBusquedadCliente.CUIT,
        descriptions: 'CUIT',
      }),
      new SelectOption({
        value: TipoBusquedadCliente.DNI,
        descriptions: 'DNI',
      }),
      new SelectOption({
        value: TipoBusquedadCliente.Usuario,
        descriptions: 'Usuario',
      }),
      new SelectOption({
        value: TipoBusquedadCliente.Cuenta,
        descriptions: 'Cuenta',
      })
    );
  }

  ngOnInit() {}

  async buscarTxt_Change(value: string) {
    this.textValue = value;

    this.search();
  }

  tipoBusquedadChange(value: number) {
    this.tipoBusquedadSelected = value;

    this.search();
  }

  cliente_Click(cliente: any) {
    this.clienteDialogRef.close({ cuenta: cliente.Cuenta });
  }

  private async search() {
    var request = new ClienteVentaRequest({
      tipoBusquedad: this.tipoBusquedadSelected,
      value: this.textValue,
    });
    var clienteResponse = await this.clienteService
      .obtenerClienteVenta(request)
      .toPromise();

    this.clientesVenta = clienteResponse.Data;
  }
}
