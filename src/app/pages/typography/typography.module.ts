import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypographyPageComponent } from './containers';
import { TypographyRoutingModule } from './typography-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { DevformComponent } from './containers/devform/devform.component';
import { FlexLayoutModule } from '@angular/flex-layout';
@NgModule({
  declarations: [TypographyPageComponent, DevformComponent],
  imports: [
    CommonModule,
    TypographyRoutingModule,
    SharedModule,
    FlexLayoutModule,
  ]
})
export class TypographyModule { }
