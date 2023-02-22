import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepositoComponent } from './deposito.component';
import { GestionStockComponent } from './gestion-stock/gestion-stock.component';


const routes: Routes = [
  {
    path: '',
    component: DepositoComponent,
    children: [
      {
        path: 'stock',
        component: GestionStockComponent,
      },
    ]
  }
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepositoRoutingModule { }
