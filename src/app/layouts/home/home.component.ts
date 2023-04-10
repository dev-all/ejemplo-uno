import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeLayout implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  public isShowSidebar!: boolean;
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
            this.isShowSidebar = false;
            if (result.breakpoints[query]) {
              if(result.breakpoints[Breakpoints.XSmall] || result.breakpoints[Breakpoints.Small] ||  result.breakpoints[Breakpoints.Medium] ){
                this.isShowSidebar = true;
              }
              this.currentScreenSize = this.displayNameMap.get(query) ?? 'Unknown';
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
        if(result.breakpoints[Breakpoints.XSmall] || result.breakpoints[Breakpoints.Small]){
          this.isShowSidebar = true;
        }
      });
    }

}
