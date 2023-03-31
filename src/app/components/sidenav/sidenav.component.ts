import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'app/data/consts/interfaces/ui/menu.model';
import { MENU } from 'app/data/mocks/menu';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  menuItems: MenuItem[] = [];
  public isOpenUiElements = true;
  constructor() { }

  ngOnInit(): void {
    this.menuItems = MENU;
  }
  hasItems(item: MenuItem) {
    return item.subItems !== undefined ? item.subItems.length > 0 : false;
  }
  // public openUiElements() {
  //   this.isOpenUiElements = !this.isOpenUiElements;
  // }
}
