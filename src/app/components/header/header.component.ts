import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '@models/Usuario';
import { LoginService } from '@services/login/login.service';
import { UserService } from '@services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() isMenuOpened!: boolean;
  @Output() isShowSidebar = new EventEmitter<boolean>();
  title = 'MAGNUM';
  user: Usuario;
  constructor(
    private router: Router,
    private loginService: LoginService,
    private userService: UserService,
    private elementRef: ElementRef
  ) {}
  ngOnInit() {
    this.user = this.userService.getUserValue();
  }


  public openMenu(): void {
    this.isMenuOpened = !this.isMenuOpened;

    this.isShowSidebar.emit(this.isMenuOpened);
  }
  logout() {
    this.loginService.logout();
    this.router.navigate(['login']);
  }
}
