import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductoRequest } from '@models/Producto/ProductoRequest';
import { ProductoService } from '@services/producto/producto.service';

@Component({
  selector: 'app-gestion-stock',
  templateUrl: './gestion-stock.component.html',
  styleUrls: ['./gestion-stock.component.scss'],
   // Need to remove view encapsulation so that the custom tooltip style defined in
  // `tooltip-custom-class-example.css` will not be scoped to this component's view.
  encapsulation: ViewEncapsulation.None,
})
export class GestionStockComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  operacionSeleccionada: string = 'Código de barras';
  TipoBusqueda = [ 'Código de barras','Código'];
  incluirVariantes: boolean = true;
  codigoFormControl = new FormControl('');
  page: number = 0;
  pageSize: number = 10;
  totalRows: number;
  totalPages: number;

  cargando = true;
  errorEnServicios: boolean;


  columnasTabla: string[] = ['codigo', 'detalle','deposito','stockactual'];

  VOForm: FormGroup;
  dataSourceEditing = new MatTableDataSource<any>();

  addressForm = this.fb.group({
    company: null,
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    address: [null, Validators.required],
    address2: null,
    city: [null, Validators.required],
    state: [null, Validators.required],
    postalCode: [null, Validators.compose([
      Validators.required, Validators.minLength(5), Validators.maxLength(5)])
    ], shipping: ['free', Validators.required]
  });
  hasUnitNumber = false;
  states = [ {name: 'Alabama', abbreviation: 'AL'}];

  constructor( private productoService: ProductoService
            ,private fb: FormBuilder,
            private _formBuilder: FormBuilder)
   { }


  ngOnInit(): void {
    this.search();
    this.VOForm = this._formBuilder.group({
      VORows: this._formBuilder.array([])
    });
  }

  onSubmit() {
    alert('Thanks!');
  }

 // this function will enabled the select field for editd
 EditSVO(VOFormElement, i) {
  // VOFormElement.get('VORows').at(i).get('name').disabled(false)
  VOFormElement.get('VORows').at(i).get('isEditable').patchValue(false);
  // this.isEditableNew = true;
}
 // On click of correct button in table (after click on edit) this method will call
 SaveVO(VOFormElement, i) {
  // alert('SaveVO')
  VOFormElement.get('VORows').at(i).get('isEditable').patchValue(true);
}
// On click of cancel button in the table (after click on edit) this method will call and reset the previous data
CancelSVO(VOFormElement, i) {
  VOFormElement.get('VORows').at(i).get('isEditable').patchValue(true);
}

//----------------
  pagesChange(event?: PageEvent) {
    this.pageSize = event.pageSize;
    this.page = event.pageIndex;
    this.search();
  }

  async getByProducto_Change() {
    this.page = 0;
    this.errorEnServicios = false;
       this.search();
  }

 private async search() {

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
      this.page = x.Data.CurrentPage;
      this.totalPages = x.Data.TotalPages;
      this.totalRows = x.Data.TotalRows;

      this.VOForm = this.fb.group({
        VORows: this.fb.array(x.Data.Productos.map(val => this.fb.group({
                  codigo: new FormControl(val.Codigo),
                  detalle: new FormControl(val.Detalle),
                  deposito: new FormControl(val.Deposito),
                  stockactual: new FormControl(val.StockActual),
                  action: new FormControl('existingRecord'),
                  isEditable: new FormControl(true),
                  isNewRow: new FormControl(false),
        })
        )) //end of fb array
      }); // end of form group cretation
      this.dataSourceEditing = new MatTableDataSource((this.VOForm.get('VORows') as FormArray).controls);
      this.dataSourceEditing.paginator = this.paginator;
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
