import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AccesoRequest } from '@models/Acceso/AccesoRequest';
import { Inicial } from '@models/Inicial/Inicial';
import { LoginRequest } from '@models/Login/LoginRequest';
import { RequestBase } from '@models/RequestBase';
import { AccesoService } from '@services/acceso/acceso.service';
import { GenericCrudService } from '@services/generic-crud.service';
import { LoginService } from '@services/login/login.service';
import { UserService } from '@services/user/user.service';

@Component({
  selector: 'app-auto-login',
  templateUrl: './auto-login.component.html',
  styleUrls: ['./auto-login.component.scss'],
})
export class AutoLoginComponent {
  loginError: boolean;
  usuario: string;
  contrasena: string;
  db: string;
  ruta: string;
  constructor(
    private route: ActivatedRoute,
    private loginService: LoginService,
    private accesoService: AccesoService,
    private userService: UserService,
    private router: Router,
    private renderer: Renderer2,
    private inicialService: GenericCrudService<Inicial>
  ) {
    this.usuario = this.route.snapshot.paramMap.get('usuario');
    this.contrasena = this.route.snapshot.paramMap.get('contrasena');
    this.db = this.route.snapshot.paramMap.get('db');
    this.ruta = this.route.snapshot.paramMap.get('ruta');

    this.login();
  }
  ngOnInit() {}

  ngOnDestroy() {
    this.renderer.setStyle(document.body, 'background-color', 'white');
  }

  login() {
    let request = new LoginRequest({
      username: this.usuario,
      password: this.contrasena,
      database: this.db.toUpperCase() !== 'UNDEFINED' ? this.db : '',
      esAutomatico: true,
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
              inicialResponse[0]
            );

            this.router.navigate(['/productos']);
          }

          if (loginResponse.error) {
            this.router.navigate(['/login']);
            this.loginError = true;
          }
        },
        error: (err) => {
          this.loginError = true;
        },
      });
  }

  reintentar() {
    this.login();
  }

  ingresoManual() {
    this.router.navigate(['/login']);
  }
}
