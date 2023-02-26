import { Component, ViewChild, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductoRequest } from '@models/Producto/ProductoRequest';
import { ProductoService } from '@services/producto/producto.service';
import {TooltipPosition} from '@angular/material/tooltip';
import { debug } from 'console';
import { MessageDialogComponent } from '@components/dialogs/message.dialog/message.dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { RegistroService } from '@services/registro/registro.service';
import { UserService } from '@services/user/user.service';
import { Registro } from '@models/Registro/Registro';
import { GlobalSnackbarService } from '@services/global.snackbar/global.snackbar.service';
import { ProveedorService } from '@services/proveedor/proveedor.service';
import { Proveedor } from '@models/Proveedor/Proveedor';
import { ProveedorRequest } from '@models/Proveedor/ProveedorRequest';


@Component({
  selector: 'app-control-stock',
  templateUrl: './control-stock.component.html',
  styleUrls: ['./control-stock.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ControlStockComponent implements OnInit {


  @ViewChild(MatPaginator) paginator: MatPaginator;
  operacionSeleccionada: string = 'Código de barras';
  TipoBusqueda = [ 'Código de barras','Código'];
 // incluirVariantes: boolean = false;
  codigoFormControl = new FormControl('');

  page: number = 0;
  pageSize: number = 10;
  totalRows: number;
  totalPages: number;

  cargando = true;
  errorEnServicios: boolean;


  columnasTabla: string[] = ['codigo', 'detalle','depositouno','depositodos'];

  VOForm: FormGroup;
  dataSourceEditing = new MatTableDataSource<any>();

  proveedoresSource: Proveedor[];
  requestProveedor = new ProveedorRequest({ database: null });
  public myForm;
This: any;
constructor( private productoService: ProductoService
            ,private fb: FormBuilder,
            private _formBuilder: FormBuilder,
            private registroService: RegistroService,
            private userService: UserService,
            private dialog: MatDialog,
            private snackbarService: GlobalSnackbarService,
            private proveedorService: ProveedorService)
   {
    this.myForm = this.fb.group({
      codigo : ['',],
      proveedor : [''],
      incluirVariantes: [true],
      });

    }


  ngOnInit(): void {

    this.search();
    this.VOForm = this._formBuilder.group({
      VORows: this._formBuilder.array([])
    });
   this.fillProveedores();

  }

  fillProveedores(): any {
		this.proveedorService.obtenerProveedores(this.requestProveedor).subscribe(response =>
      {
         this.proveedoresSource = response.Proveedores;
      },
    () => (
      this.snackbarService.showSnackBar('No es posible obtener la lista de proveedores ')
    )
    );
	}

 // this function will enabled the select field for editd
 EditSVO(deposito,VOFormElement, i) {
  // VOFormElement.get('VORows').at(i).get('name').disabled(false)
  debugger;
  if(deposito == 1){
    VOFormElement.get('VORows').at(i).get('isEditableSADU').patchValue(false);
  }
  else{
    VOFormElement.get('VORows').at(i).get('isEditableSADD').patchValue(false);
  }

}
 // On click of correct button in table (after click on edit) this method will call
 SaveVO(deposito, VOFormElement, i) {
   debugger;

  let stock = 0;
  if(deposito == 1){
    VOFormElement.get('VORows').at(i).get('isEditableSADU').patchValue(true);
    deposito=1;
    stock =parseInt(VOFormElement.get('VORows').at(i).get('stockActualDepositoUno').value)
  }
  else{
    VOFormElement.get('VORows').at(i).get('isEditableSADD').patchValue(true);
    deposito=2;
    stock =parseInt(VOFormElement.get('VORows').at(i).get('stockActualDepositoDos').value)
  }

  if (stock == 0 ) {
    this.dialog.open(MessageDialogComponent, {
      data: {
        message: 'La cantidad debe ser mayor a 0',
      },
    });
    return;
  }

   const registro = new Registro({
    Cantidad:stock,
    Tipo: 3,
    Descripcion: "Edición Manual (app móvil)",
    CpInterno: VOFormElement.get('VORows').at(i).get('cpInterno').value,
    Deposito: deposito,
    Vendedor: this.userService.getUserValue().Id,
    idVariante: VOFormElement.get('VORows').at(i).get('idVariante').value,

  });
this.createRegistro(registro);
}
// On click of cancel button in the table (after click on edit) this method will call and reset the previous data
CancelSVO(deposito,VOFormElement, i) {

 // VOFormElement.get('VORows').at(i).get('isEditable').patchValue(true);
 if(deposito == 1){
  VOFormElement.get('VORows').at(i).get('isEditableSADU').patchValue(true);
}
else{
  VOFormElement.get('VORows').at(i).get('isEditableSADD').patchValue(true);
}
}
//----------------
private createRegistro(registro: Registro) {
  debugger;
  this.registroService.createRegistro(registro).subscribe(
    () => {
      this.snackbarService.showSnackBar('Se actualizoó el Stock...');
    },
    (err) => {
      const errorStatus = err.error.Error.Status;

      if (errorStatus === 2) {
        this.snackbarService.showSnackBar('No existe en stock el ajuste que desea realizar')
      } else {
        this.snackbarService.showSnackBar('Se produjo un error... No se pudo actualizar el Stock. ');
      }
    }
  );
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

  //console.log(this.myForm.value);
  this.cargando = true;
  //let getby = null;
  // switch (this.operacionSeleccionada) {
  //   case 'Código' : getby = 1 ;
  //                 break;
  //   case 'Código de barras': getby=2;
  //                 break;
  // }

  var request = new ProductoRequest({
    codigo:  null,//getby == 1  ? this.codigoFormControl.value : null,
    codigoBarra: null, // getby == 2  ? this.codigoFormControl.value : null,
    CodigoGlobal: this.myForm.get('codigo')?.value,
    codigoProveedor: null,
    bajoControlStock: null,
    stockPositivo: null,
    excluirNovedades: null,
    enOferta: null,
    suspendido: null,
    detalle:  null,
    idProveedor: this.myForm.get('proveedor')?.value  ,
    idDeposito:  null,
    codigoMarca:  null,
    codigoMoneda:  null,
    page: this.page + 1,
    pageSize: this.pageSize,
    database:null,
    IncluirVariante: this.myForm.get('incluirVariantes')?.value,

  });

  this.productoService.getByFiltros(request).subscribe(
    (x) => {
      debugger;
      this.cargando = false;
      this.page = x.Data.CurrentPage;
      this.totalPages = x.Data.TotalPages;
      this.totalRows = x.Data.TotalRows;

      this.VOForm = this.fb.group({

        VORows: this.fb.array(x.Data.Productos.map(val => this.fb.group({

                  codigo: new FormControl(val.Codigo),
                  detalle: new FormControl(val.Detalle),
                  deposito: new FormControl(val.Deposito),
                  stockActualDepositoUno: new FormControl(val.StockActualDeposito1),
                  stockActualDepositoDos: new FormControl(val.StockActualDeposito2),
                  isEditableSADU: new FormControl(true),
                  isEditableSADD: new FormControl(true),
                  stockactual: new FormControl(val.StockActual),
                  cpInterno: new FormControl(val.CpInterno),
                  idVariante: new FormControl(val.IdVariante),
                  action: new FormControl('existingRecord'),
                 // isEditable: new FormControl(true),
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
