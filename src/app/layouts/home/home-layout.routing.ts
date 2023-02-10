import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from 'src/app/pages/cliente/cliente.component';
import { HomePage } from 'src/app/pages/home/home.component';
import { MovimientoDepositoPage } from 'src/app/pages/movimiento-deposito/movimiento-deposito.component';
import { PdfViewerPage } from 'src/app/pages/pdf.viewer/pdf.viewer.component';
import { ProductPage } from 'src/app/pages/producto/product.component';
import { ReciboCuentaCorrientePage } from 'src/app/pages/recibo-cuenta-corriente/recibo-cuenta-corriente';
import { ResumenCuentaPage } from 'src/app/pages/resumen.cuenta/resumen.cuenta.component';
import { VentasComponent } from 'src/app/pages/ventas/ventas.component';
import { HomeLayout } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeLayout,
    children: [
      {
        path: '',
        component: HomePage,
      },
      {
        path: 'productos',
        component: ProductPage,
      },
      {
        path: 'movimiento-depositos',
        component: MovimientoDepositoPage,
      },
      {
        path: 'ventas',
        component: VentasComponent,
      },
      {
        path: 'pdf-viewer/:binaryData/:reportType',
        component: PdfViewerPage,
      },
      {
        path: 'clientes',
        component: ClienteComponent,
      },
      {
        path:'resumen-cuenta/:numeroCuenta/:nombreCliente',
        component: ResumenCuentaPage
      },
      {
        path:'recibo-cuenta-corriente/:numeroCuenta/:nombreCliente',
        component:ReciboCuentaCorrientePage
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];

export const MainRoutes = RouterModule.forChild(routes);
