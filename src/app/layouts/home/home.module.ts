import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeLayout } from './home.component';
import { MainRoutes } from './home-layout.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from '@pages/home/home.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ComponentsModule } from '@components/components.module';
import { SecurityAccess } from '@shared/securityAccess';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PdfViewerPage } from '@pages/pdf.viewer/pdf.viewer.component';
import { MatPaginatorIntl} from '@angular/material/paginator';
import { CustomMatPaginatorIntl } from '@shared/CustomMatPaginatorIntl';
import { MovimientoDepositoPage } from '@pages/movimiento-deposito/movimiento-deposito.component';
import { VentasComponent } from '@pages/ventas/ventas.component';
import { RoundPipe } from '@pipes/round.pipe';
import { FixedPipe } from '@pipes/fixed.pipe';
import { ClienteComponent } from '@pages/cliente/cliente.component';
import { ResumenCuentaPage } from '@pages/resumen.cuenta/resumen.cuenta.component';
import { ReciboCuentaCorrientePage } from '@pages/recibo-cuenta-corriente/recibo-cuenta-corriente';
import { MaterialModule } from '@shared/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  imports: [

    MainRoutes,
    FlexLayoutModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NgxMatSelectSearchModule,
    ComponentsModule,
    PdfViewerModule,
    MaterialModule,

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
    ReciboCuentaCorrientePage,
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
