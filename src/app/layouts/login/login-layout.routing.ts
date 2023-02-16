import { RouterModule, Routes } from '@angular/router';
import { AutoLoginComponent } from '@components/auto-login/auto-login.component';
import { LoginComponent } from '@pages/login/login.component';
import { LoginLayoutComponent } from './login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
      },
      {
        path: 'automatico/:usuario/:contrasena/:db/:ruta',
        component: AutoLoginComponent
      }
    ],
  },
];

export const MainRoutes = RouterModule.forChild(routes);
