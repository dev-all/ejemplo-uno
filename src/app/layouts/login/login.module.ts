import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginLayoutComponent } from './login.component';
import { MainRoutes } from './login-layout.routing';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { ComponentsModule } from '@components/components.module';
import { LoginComponent } from '@pages/login/login.component';

@NgModule({
  imports: [
    MainRoutes,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    ComponentsModule
  ],
  declarations: [LoginLayoutComponent, LoginComponent],
})
export class LoginModule {}
