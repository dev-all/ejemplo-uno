import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const loginModule = () =>
  import('./layouts/login/login.module').then((x) => x.LoginModule);

const mainModule = () =>
  import('./layouts/home/home.module').then((x) => x.HomeModule);

const routes: Routes = [
  { path: 'login'
      , loadChildren: loginModule
      , canActivate: [LoginGuard]
  },
  { path: ''
    , loadChildren: mainModule
    , canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
