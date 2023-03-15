import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeLayout } from './home.component';
import { MainRoutes } from './home-layout.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { HomePage } from '@pages/home/home.component';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { ComponentsModule } from '@components/components.module';
import { SecurityAccess } from '@shared/securityAccess';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PdfViewerPage } from '@pages/pdf.viewer/pdf.viewer.component';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { CustomMatPaginatorIntl } from '@shared/CustomMatPaginatorIntl';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MovimientoDepositoPage } from '@pages/movimiento-deposito/movimiento-deposito.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { VentasComponent } from '@pages/ventas/ventas.component';
import { RoundPipe } from '@pipes/round.pipe';
import { FixedPipe } from '@pipes/fixed.pipe';
import { ClienteComponent } from '@pages/cliente/cliente.component';
import { ResumenCuentaPage } from '@pages/resumen.cuenta/resumen.cuenta.component';
import { MatDividerModule } from '@angular/material/divider';
import { ReciboCuentaCorrientePage } from '@pages/recibo-cuenta-corriente/recibo-cuenta-corriente';
import {MatRadioModule} from '@angular/material/radio';


@NgModule({
  imports: [
    MainRoutes,
    FormsModule,
    CommonModule,
    MatIconModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    MatOptionModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    NgxMatSelectSearchModule,
    ComponentsModule,
    PdfViewerModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDividerModule,
    MatButtonToggleModule,
    MatRadioModule
  ],
  declarations: [
    HomePage,
    HomeLayout,
    PdfViewerPage,
    MovimientoDepositoPage,
    ResumenCuentaPage,
    ClienteComponent,
    VentasComponent,
    RoundPipe,
    FixedPipe,
    ReciboCuentaCorrientePage
  ],

  providers: [
    SecurityAccess,
    {
      provide: MatPaginatorIntl,
      useClass: CustomMatPaginatorIntl,
    },
  ],
})
export class HomeModule {}
