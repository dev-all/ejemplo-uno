import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { forkJoin } from 'rxjs';
import { Categoria } from '@models/Categoria/Categoria';
import { Ciudad } from '@models/Ciudad/Ciudad';
import { Cliente } from '@models/Cliente/Cliente';
import { ClienteRequest } from '@models/Cliente/ClienteRequest';
import { Formas } from '@models/Formas/Formas';
import { InputDinamico } from '@models/FormDinamico/InputDinamico';
import { Lista } from '@models/Lista/Lista';
import { Provincia } from '@models/Provincia/Provincia';
import { RequestBase } from '@models/RequestBase';
import { Sucursal } from '@models/Sucursal/Sucursal';
import { Vendedor } from '@models/Vendedor/Vendedor';
import { Zona } from '@models/Zona/Zona';
import { ClienteService } from '@services/cliente/cliente.service';
import { GenericCrudService } from '@services/generic-crud.service';
import { VendedorService } from '@services/vendedor/vendedor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class ClienteComponent implements OnInit {
  nombreFormControl = new FormControl('');
  cuitFormControl = new FormControl('');
  cuentaFormControl = new FormControl('');
  nombreFantasiaFormControl = new FormControl('');
  agendaFormControl = new FormControl('');
  direccionFormControl = new FormControl('');
  provinciaSelected: number;
  categoriaSelected: number;
  formaVentaSelected: number;
  ciudadSelected: number;
  listaSelected: number;
  zonaSelected: number;
  vendedorSelected: number;
  sucursalSelected: number;
  expandedElement = true;

  provincias: Provincia[];
  categorias: Categoria[];
  formas: Formas[];
  ciudades: Ciudad[];
  listas: Lista[];
  zonas: Zona[];
  vendedores: Vendedor[];
  sucursales: Sucursal[];

  columnasTabla: string[] = [
    'razonSocial',
    'nombreFantasia',
    'tlf',
    'ciudad',
    'direccion',
  ];
  clientes: Cliente[] = [];

  listaInputs: InputDinamico[] = [
    new InputDinamico({
      descripcion: 'Nombre',
      checked: true,
      isDefault: true,
    }),
    new InputDinamico({ descripcion: 'CUIT', checked: true, isDefault: true }),
    new InputDinamico({
      descripcion: 'Cuenta',
      checked: true,
      isDefault: true,
    }),
    new InputDinamico({
      descripcion: 'Nomre Fantasia',
      checked: true,
      isDefault: true,
    }),
    new InputDinamico({ descripcion: 'Provincia' }),
    new InputDinamico({ descripcion: 'Categoria' }),
    new InputDinamico({ descripcion: 'Forma Venta' }),
    new InputDinamico({ descripcion: 'Ciudad' }),
    new InputDinamico({ descripcion: 'Lista' }),
    new InputDinamico({ descripcion: 'Zona' }),
    new InputDinamico({ descripcion: 'Vendedor exclusivo' }),
    new InputDinamico({ descripcion: 'Agenda' }),
    new InputDinamico({ descripcion: 'Direccion' }),
    new InputDinamico({ descripcion: 'Sucursal' }),
  ];

  listaInputsParaMostrar: InputDinamico[] = [
    new InputDinamico({
      descripcion: 'Nombre',
      checked: true,
      isDefault: true,
    }),
    new InputDinamico({ descripcion: 'CUIT', checked: true, isDefault: true }),
    new InputDinamico({
      descripcion: 'Cuenta',
      checked: true,
      isDefault: true,
    }),
    new InputDinamico({
      descripcion: 'Nomre Fantasia',
      checked: true,
      isDefault: true,
    }),
  ];
  page: number = 0;
  pageSize: number = 5;
  totalPages: number;
  totalRows: number = 0;

  constructor(
    private provinciaService: GenericCrudService<Provincia>,
    private categoriaService: GenericCrudService<Categoria>,
    private formasService: GenericCrudService<Formas>,
    private ciudadService: GenericCrudService<Ciudad>,
    private listaService: GenericCrudService<Lista>,
    private zonaService: GenericCrudService<Zona>,
    private vendedorService: VendedorService,
    private sucursalService: GenericCrudService<Sucursal>,
    private clienteServicie: ClienteService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    var baseRequest = new RequestBase({ database: null });
    var provinciaPromise = this.provinciaService.obtener(
      baseRequest,
      'provincia'
    );
    var categoriaPromise = this.categoriaService.obtener(
      baseRequest,
      'categoria'
    );
    var formasPromise = this.formasService.obtener(baseRequest, 'formas');
    var ciudadPromise = this.ciudadService.obtener(baseRequest, 'ciudad');
    var listaPromise = this.listaService.obtener(baseRequest, 'lista');
    var zonaPromise = this.zonaService.obtener(baseRequest, 'zona');
    var vendedorPromise = this.vendedorService.obtener(baseRequest);
    var sucursalPromise = this.sucursalService.obtener(baseRequest, 'sucursal');
    var clienteBuscarPromise = this.buscarClientes();

    forkJoin({
      provinciaPromise,
      categoriaPromise,
      formasPromise,
      ciudadPromise,
      listaPromise,
      zonaPromise,
      vendedorPromise,
      sucursalPromise,
      clienteBuscarPromise,
    }).subscribe((res) => {
      this.provincias = res.provinciaPromise.Data;
      this.categorias = res.categoriaPromise.Data;
      this.formas = res.formasPromise.Data;
      this.ciudades = res.ciudadPromise.Data;
      this.listas = res.listaPromise.Data.filter(
        (x) => x.Habil.toLowerCase() == 'si'
      );
      this.zonas = res.zonaPromise.Data;
      this.vendedores = res.vendedorPromise.Data;
      this.sucursales = res.sucursalPromise.Data;
    });
  }

  lista_Event(tipoInput: InputDinamico) {
    const existe = this.listaInputsParaMostrar.find(
      (x) => x.descripcion === tipoInput.descripcion
    );

    if (existe) {
      const index = this.listaInputsParaMostrar.findIndex(
        (x) => x.descripcion === tipoInput.descripcion
      );
      this.listaInputsParaMostrar.splice(index, 1);
    } else {
      this.listaInputsParaMostrar.push(tipoInput);
    }
  }

  pagesChange(event?: PageEvent) {
    this.pageSize = event.pageSize;
    this.page = event.pageIndex;

    this.buscarClientes();
  }

  buscar_Click() {
    this.page = 0;
    this.buscarClientes();
  }

  async buscarClientes() {
    this.clientes = [];

    var request = new ClienteRequest({
      Cuenta: this.cuentaFormControl.value,
      Nombre: this.nombreFormControl.value,
      NombreFantasia: this.nombreFantasiaFormControl.value,
      FormaVenta: this.formaVentaSelected >= 0 ? this.formaVentaSelected : null,
      IdLista: this.listaSelected >= 0 ? this.listaSelected : null,
      Direccion: this.direccionFormControl.value,
      CUIT: this.cuitFormControl.value,
      IdProvincia: this.provinciaSelected >= 0 ? this.provinciaSelected : null,
      IdCuidad: this.ciudadSelected >= 0 ? this.ciudadSelected : null,
      IdVendedor: this.vendedorSelected >= 0 ? this.vendedorSelected : null,
      idZona: this.zonaSelected >= 0 ? this.zonaSelected : null,
      Idsucursal: this.sucursalSelected >= 0 ? this.sucursalSelected : null,
      IdCategoria: this.categoriaSelected >= 0 ? this.categoriaSelected : null,
      Aclaracion: this.agendaFormControl.value,
      page: this.page + 1,
      pageSize: this.pageSize,
    });

    const clienteResponse = await this.clienteServicie
      .getByFiltros(request)
      .toPromise();

    this.page = clienteResponse.CurrentPage;
    this.clientes = clienteResponse.Clientes;
    this.totalPages = clienteResponse.TotalPages;
    this.totalRows = clienteResponse.TotalRows;
  }

  resumenCuenta_Click(numeroCuenta: number, nombreCliente: string) {
    this.router.navigate(['/resumen-cuenta', numeroCuenta, nombreCliente]);
  }

  recibo_Click(numeroCuenta: number, nombreCliente: string) {
    this.router.navigate(['/recibo-cuenta-corriente', numeroCuenta, nombreCliente]);
  }

}
