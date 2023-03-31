import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  public isShowSidebar!: boolean ;
  currentScreenSize = '';
  orientation = '';
  // Create a map to display breakpoint names for demonstration purposes.
  displayNameMap = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
    ['(orientation: portrait)', 'Portrait'],
    ['(orientation: landscape)', 'Landscape'],
  ]);
  constructor(private breakpointObserver: BreakpointObserver) {

    breakpointObserver
        .observe([
          Breakpoints.XSmall, //0-600
          Breakpoints.Small,  //960
          Breakpoints.Medium, //1280
          Breakpoints.Large,  //1920
          Breakpoints.XLarge, //+
        ])
        .subscribe((result) => {
          for (const query of Object.keys(result.breakpoints)) {
            if (result.breakpoints[query]) {
              console.log(query);
              this.currentScreenSize = this.displayNameMap.get(query) ?? 'Unknown';
            }
          }
        });
        breakpointObserver
        .observe(['(orientation: portrait)', '(orientation: landscape)'])
        .subscribe((result) => {
          for (const query of Object.keys(result.breakpoints)) {
            if (result.breakpoints[query]) {
              console.log(query);
              this.orientation = this.displayNameMap.get(query) ?? 'Unknown';
            }
          }
        });

  }

    ngOnInit(): void {
      this.breakpointObserver
      .observe([
                Breakpoints.XSmall, //0-600
                Breakpoints.Small,  //960
                Breakpoints.Medium, //1280
                Breakpoints.Large,  //1920
                Breakpoints.XLarge, //+
              ])
      .subscribe((result) => {
        this.isShowSidebar = false;
        if(result.breakpoints[Breakpoints.Small,Breakpoints.XSmall]){
          console.log("mostrar sidenav");
          this.isShowSidebar = true;
        }
      });
    }

}
