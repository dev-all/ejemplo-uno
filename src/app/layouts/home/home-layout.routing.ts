import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from '@pages/cliente/cliente.component';
import { HomePage } from '@pages/home/home.component';
import { MovimientoDepositoPage } from '@pages/movimiento-deposito/movimiento-deposito.component';
import { PdfViewerPage } from '@pages/pdf.viewer/pdf.viewer.component';
import { ReciboCuentaCorrientePage } from '@pages/recibo-cuenta-corriente/recibo-cuenta-corriente';
import { ResumenCuentaPage } from '@pages/resumen.cuenta/resumen.cuenta.component';
import { VentasComponent } from '@pages/ventas/ventas.component';
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
        path: 'test',
        pathMatch: 'full',
        loadChildren: () => import('@pages/typography/typography.module').then(m => m.TypographyModule)
      },
      {
        path: 'productos',
        loadChildren: () => import('@pages/producto/producto.module').then(m => m.ProductoModule)
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
