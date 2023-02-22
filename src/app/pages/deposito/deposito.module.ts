import { NgModule } from '@angular/core';
import { DepositoComponent } from './deposito.component';
import { SharedModule } from '@shared/shared.module';
import { DepositoRoutingModule } from './deposito-routing.module';
import { GestionStockComponent } from './gestion-stock/gestion-stock.component';



@NgModule({
  declarations: [DepositoComponent,GestionStockComponent],
  imports: [
    SharedModule,
    DepositoRoutingModule,
  ]
})
export class DepositoModule { }
