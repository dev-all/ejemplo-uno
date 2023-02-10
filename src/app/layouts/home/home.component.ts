import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HasElementRef } from '@angular/material/core/common-behaviors/color';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeLayout implements OnInit {
  @ViewChild('contentWrap') contentWrap: ElementRef<HTMLElement>;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {}

  ngAfterViewInit() {
    const subMenus = this.elementRef.nativeElement.querySelectorAll(
      '.dropdown-container'
    );

    const mainMenu = this.elementRef.nativeElement.querySelector('.main-menu');
    const contenteWrap =
      this.elementRef.nativeElement.querySelector('.content-wrap');

    for (var i = 0; i < subMenus.length; i++) {
      subMenus[i].addEventListener('click', function () {
        mainMenu.classList.remove('menu-expanded');
        mainMenu.classList.add('menu-closed');
      });
    }

    mainMenu.addEventListener('click', function () {
      if (mainMenu.classList.contains('menu-expanded')) {
        mainMenu.classList.remove('menu-closed');
        mainMenu.classList.add('menu-expanded');
      } else {
        mainMenu.classList.remove('menu-expanded');
        mainMenu.classList.add('menu-closed');
      }
    });

    mainMenu.addEventListener('mouseover', function () {
      //expandir
      mainMenu.classList.remove('menu-closed');
      mainMenu.classList.add('menu-expanded');
    });

    contenteWrap.addEventListener('mouseover', function () {
      //expandir
      mainMenu.classList.remove('menu-expanded');
      mainMenu.classList.add('menu-closed');
    });
  }
}
