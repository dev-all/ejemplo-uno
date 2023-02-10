import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginLayoutComponent } from './login.component';
import { MainRoutes } from './login-layout.routing';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { AutoLoginComponent } from 'src/app/components/auto-login/auto-login.component';
import { MatSelectModule } from '@angular/material/select';
import { ComponentsModule } from 'src/app/components/components.module';

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
