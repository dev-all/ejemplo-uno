import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { RouterModule } from '@angular/router';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ComponentsModule } from '@components/components.module';
import { SecurityAccess } from '@shared/securityAccess';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PdfViewerPage } from '@pages/pdf.viewer/pdf.viewer.component';
import { CustomMatPaginatorIntl } from '@shared/CustomMatPaginatorIntl';
import { MovimientoDepositoPage } from '@pages/movimiento-deposito/movimiento-deposito.component';
import { VentasComponent } from '@pages/ventas/ventas.component';
import { RoundPipe } from '@pipes/round.pipe';
import { FixedPipe } from '@pipes/fixed.pipe';
import { ClienteComponent } from '@pages/cliente/cliente.component';
import { ResumenCuentaPage } from '@pages/resumen.cuenta/resumen.cuenta.component';
import { ReciboCuentaCorrientePage } from '@pages/recibo-cuenta-corriente/recibo-cuenta-corriente';
import { MaterialModule } from './material/material.module';

@NgModule({
  imports: [
      FormsModule,
      CommonModule,
      ReactiveFormsModule,
      NgxMatSelectSearchModule,
      ComponentsModule,
      PdfViewerModule,
      MaterialModule,
    ],
  declarations: [],
  exports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NgxMatSelectSearchModule,
    ComponentsModule,
    PdfViewerModule,
    MaterialModule,
  ],
})
export class SharedModule { }
