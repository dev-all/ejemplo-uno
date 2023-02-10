import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StockGridComponent } from './stock.grid/stock.grid.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GlobalSpinnerComponent } from './global.spinner/global.spinner.component';
import { MessageDialogComponent } from './dialogs/message.dialog/message.dialog.component';
import { AjusteStockDialogComponent } from './dialogs/ajuste.stock.dialog/ajuste.stock.dialog.component';
import { InicioStockDialogComponent } from './dialogs/inicio.stock.dialog/inicio.stock.dialog.component';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { DistinctPipe } from '../pipes/distinct.pipe';
import { ConfirmationDialogComponent } from './dialogs/confirmation.dialog/confirmation.dialog.component';
import { MovimientosDialogComponent } from './dialogs/movimientos.dialog/movimientos.dialog.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMenuModule } from '@angular/material/menu';
import { SaveReportDialogComponent } from './dialogs/save.report.dialog/save.report.dialog.component';
import { WhatsappReportDialogComponent } from './dialogs/whatsapp.report.dialog/whatsapp.report.dialog.component';
import { MailReportDialogComponent } from './dialogs/mail.report.dialog/mail.report.dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { GlobalSnackbarComponent } from './global.snackbar/global.snackbar.component';
import { AutoLoginComponent } from './auto-login/auto-login.component';

import { MatTreeModule } from '@angular/material/tree';
import { TreeComponent } from './tree/tree.component';
import { ListaInputsComponent } from './lista-inputs/lista-inputs.component';
import { MatListModule } from '@angular/material/list';
import { NuevoMovimientoDialogComponent } from './dialogs/nuevo-movimiento-dialog/nuevo-movimiento-dialog.component';
import { SeleccionProductosComponent } from './dialogs/seleccion-productos/seleccion-productos.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

import { AgregarProductoDialogComponent } from './dialogs/agregar-producto-dialog/agregar-producto-dialog.component';
import { AgregarMercaderiaDialogComponent } from './dialogs/agregar-mercaderia-dialog/agregar-mercaderia-dialog/agregar-mercaderia-dialog.component';
import { ModificarMovimientoDialogComponent } from './dialogs/modificar-movimiento-dialog/modificar-movimiento-dialog.component';
import { MagnumInputComponent } from './magnum-input/magnum-input.component';
import { MagnumButtonComponent } from './magnum-button/magnum-button.component';
import { MagnumSelectComponent } from './magnum-select/magnum-select.component';
import { ClienteDialogComponent } from './dialogs/cliente-dialog/cliente-dialog.component';
import { LoginDialogComponent } from './dialogs/login.dialog/login.dialog.component';
import { PedidoMercaderiaDialogComponent } from './dialogs/pedido.mercaderia.dialog/pedido.mercaderia.dialog.component';
import { BonificacionGeneralDialogComponent } from './dialogs/bonificacion.general-dialog/bonificacion.general-dialog.component';
import { BonificacionItemDialogComponent } from './dialogs/bonificacion.item-dialog/bonificacion.item-dialog.component';
import { ProductoDialogComponent } from './dialogs/producto.dialog/producto.dialog.component';



@NgModule({
  imports: [
    RouterModule,
    FormsModule,
    CommonModule,
    MatIconModule,
    MatTableModule,
    MatRadioModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    MatDialogModule,
    MatCheckboxModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatSnackBarModule,
    MatTreeModule,
    MatListModule,
    NgxMatSelectSearchModule,
  ],
  declarations: [
    DistinctPipe,
    SidebarComponent,
    StockGridComponent,
    MessageDialogComponent,
    GlobalSpinnerComponent,
    GlobalSnackbarComponent,
    MovimientosDialogComponent,
    AjusteStockDialogComponent,
    InicioStockDialogComponent,
    ConfirmationDialogComponent,
    ClienteDialogComponent,
    SaveReportDialogComponent,
    WhatsappReportDialogComponent,
    MailReportDialogComponent,
    AutoLoginComponent,
    TreeComponent,
    ListaInputsComponent,
    NuevoMovimientoDialogComponent,
    SeleccionProductosComponent,
    AgregarProductoDialogComponent,
    AgregarMercaderiaDialogComponent,
    ModificarMovimientoDialogComponent,
    MagnumInputComponent,
    MagnumButtonComponent,
    MagnumSelectComponent,
    LoginDialogComponent,
    PedidoMercaderiaDialogComponent,
    BonificacionGeneralDialogComponent,
    BonificacionItemDialogComponent,
    ProductoDialogComponent,    
  ],
  exports: [
    AjusteStockDialogComponent,
    MessageDialogComponent,
    GlobalSpinnerComponent,
    GlobalSnackbarComponent,
    InicioStockDialogComponent,
    StockGridComponent,
    SidebarComponent,
    MovimientosDialogComponent,
    WhatsappReportDialogComponent,
    MailReportDialogComponent,
    AutoLoginComponent,
    TreeComponent,
    ListaInputsComponent,
    NuevoMovimientoDialogComponent,
    SeleccionProductosComponent,
    AgregarMercaderiaDialogComponent,
    ModificarMovimientoDialogComponent,
    ClienteDialogComponent,
    MagnumInputComponent,
    MagnumButtonComponent,
    MagnumSelectComponent,
    LoginDialogComponent,
    PedidoMercaderiaDialogComponent,
    BonificacionGeneralDialogComponent,
    BonificacionItemDialogComponent,
    ProductoDialogComponent,    
  ],
})
export class ComponentsModule {}
