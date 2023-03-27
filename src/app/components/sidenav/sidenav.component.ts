import { Component, OnInit } from '@angular/core';
import { routes } from 'app/data/consts/routes';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  public routes: typeof routes = routes;
  public isOpenUiElements = true;
  constructor() { }

  ngOnInit(): void {
  }
  public openUiElements() {
    this.isOpenUiElements = !this.isOpenUiElements;
  }
}
