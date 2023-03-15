import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductoListComponent } from './producto-list/producto-list.component';
import { ProductoComponent } from './producto.component';
import { ControlStockComponent } from './control-stock/control-stock.component';

const routes: Routes = [
  {
    path: '',
    component: ProductoComponent,
    children: [
      {
        path: 'list',
        component: ProductoListComponent,
      },
      {
        path: 'stock',
        component: ControlStockComponent,
      },
    ]
  }
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductoRoutingModule { }
