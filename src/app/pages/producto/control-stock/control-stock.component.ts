import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Producto } from '@models/Producto/Producto';
import { ProductoRequest } from '@models/Producto/ProductoRequest';
import { ProductoService } from '@services/producto/producto.service';
import { CodigoInput } from '@shared/enums/CodigoInput.enum';
import { debug } from 'console';
@Component({
  selector: 'app-control-stock',
  templateUrl: './control-stock.component.html',
  styleUrls: ['./control-stock.component.scss']
})
export class ControlStockComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  //dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  isAddMode: boolean = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  operacionSeleccionada: string = 'Código de barras';
  TipoBusqueda = [ 'Código de barras','Código'];
  incluirVariantes: boolean = false;
  codigoFormControl = new FormControl('');
  page: number = 0;
  pageSize: number = 100;
  totalRows: number;
  totalPages: number;
  cargando = true;
  errorEnServicios: boolean;
  dataSource: Producto[] = [];
  columnasTabla: string[] = [
    'codigo',
    'descripcion',
    'ubicacion',
    'stockActual'
  ];

constructor( private productoService: ProductoService,) { }


  ngOnInit(): void {
    this.search();
  }


  pagesChange(event?: PageEvent) {
    this.pageSize = event.pageSize;
    this.page = event.pageIndex;
    this.search();
  }

  async getByProducto_Change() {
       this.search();
  }

 private async search() {
  debugger;
  this.dataSource = [];
  this.cargando = true;
  let getby = null;
 switch (this.operacionSeleccionada) {
  case 'Código' : getby = 1 ;
                break;
  case 'Código de barras': getby=2;
                 break;
}

  var request = new ProductoRequest({
    codigo:  getby == 1  ? this.codigoFormControl.value : null,
    codigoBarra: getby == 2  ? this.codigoFormControl.value : null,
    codigoProveedor: null,
    bajoControlStock: null,
    stockPositivo: null,
    excluirNovedades: null,
    enOferta: null,
    suspendido: null,
    detalle:  null,
    idProveedor:  null,
    idDeposito:  null,
    codigoMarca:  null,
    codigoMoneda:  null,
    page: this.page + 1,
    pageSize: this.pageSize,
    database:null,
    IncluirVariante: this.incluirVariantes,

  });

  this.productoService.getByFiltros(request).subscribe(
    (x) => {
      this.cargando = false;
      this.dataSource = x.Data.Productos;
      this.page = x.Data.CurrentPage;
      this.totalPages = x.Data.TotalPages;
      this.totalRows = x.Data.TotalRows;
      return;
    },
    (error) => {
      this.errorEnServicios = true;
      this.cargando = false;
    },
    () => (this.cargando = false)
  );





  }


}
