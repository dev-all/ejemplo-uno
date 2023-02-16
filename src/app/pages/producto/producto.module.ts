import { NgModule } from '@angular/core';
import { ProductoRoutingModule } from './producto-routing.module';
import { ProductoListComponent } from './producto-list/producto-list.component';
import { ProductoComponent } from './producto.component';
import { SharedModule } from '@shared/shared.module';
import { ControlStockComponent } from './control-stock/control-stock.component';

@NgModule({
    declarations: [ProductoComponent,ProductoListComponent, ControlStockComponent ],
    imports: [
        SharedModule,
        ProductoRoutingModule,
    ]
})
export class ProductoModule { }
