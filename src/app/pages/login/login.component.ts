import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AccesoRequest } from '@models/Acceso/AccesoRequest';
import { Inicial } from '@models/Inicial/Inicial';
import { LoginRequest } from '@models/Login/LoginRequest';
import { RequestBase } from '@models/RequestBase';
import { Vendedor } from '@models/Vendedor/Vendedor';
import { AccesoService } from '@services/acceso/acceso.service';
import { GenericCrudService } from '@services/generic-crud.service';
import { LoginService } from '@services/login/login.service';
import { UserService } from '@services/user/user.service';
import { VendedorService } from '@services/vendedor/vendedor.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  vendedorSelected: string;
  passFormControl = new FormControl('', [Validators.required]);
  matcher = new ErrorStateMatcher();

  loading = false;
  validCredentials = true;
  serviceError = false;

  vendedores: Vendedor[] = [];

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private userService: UserService,
    private loginService: LoginService,
    private accesoService: AccesoService,
    private vendedorService: VendedorService,
    private inicialService: GenericCrudService<Inicial>
  ) {}

  ngOnInit() {
    this.loading = true;
    this.passFormControl.disable();
    this.renderer.setStyle(document.body, 'background-color', '#363856');

    this.vendedorService.obtener(new RequestBase({ database: null })).subscribe(
      (response) => {
        this.vendedores = response.Data;
        this.passFormControl.enable();
        this.loading = false;
      },
      (error) => {
        this.serviceError = true;
        this.loading = false;
      }
    );
  }

  ngOnDestroy() {
    this.renderer.setStyle(document.body, 'background-color', 'white');
  }

  login() {
    this.loading = true;
    this.serviceError = false;
    this.validCredentials = true;
    this.passFormControl.disable();

    var request = new LoginRequest({
      username: this.vendedorSelected,
      password: this.passFormControl.value,
      database: '',
      esAutomatico: false,
    });

    this.loginService
      .login(request)
      .pipe(first())
      .subscribe({
        next: async (loginResponse) => {
          if (!loginResponse.error) {
            var accesoResponse = await this.accesoService
              .getAccess(
                new AccesoRequest({ idVendedor: loginResponse.idVendedor })
              )
              .toPromise();
            var baseRequest = new RequestBase({ database: null });

            const inicialResponse = await this.inicialService
              .obtener(baseRequest, 'inicial')
              .toPromise();

            this.userService.setUserValue(
              loginResponse,
              accesoResponse,
              inicialResponse.Data[0]
            );

            this.router.navigate(['/productos']);
          }
        },
        error: (err) => {
          this.passFormControl.enable();
          this.loading = false;
          if (err.error.error) {
            this.validCredentials = false;
          } else {
            this.serviceError = true;
          }
        },
      });
  }
}
