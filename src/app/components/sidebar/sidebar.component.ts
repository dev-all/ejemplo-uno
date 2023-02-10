import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/Usuario';
import { LoginService } from 'src/app/services/login/login.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
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

  ngAfterViewInit() {
    const dropdown =
      this.elementRef.nativeElement.querySelectorAll('.dropdown-btn');

    

    
    for (var i = 0; i < dropdown.length; i++) {
      dropdown[i].addEventListener('click', function () {
        this.classList.toggle('active');
        var dropdownContent = this.nextElementSibling;
        if (dropdownContent.style.display === 'block') {
          dropdownContent.style.display = 'none';
        } else {
          dropdownContent.style.display = 'flex';
        }
      });
    }

  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['login']);
  }
}
