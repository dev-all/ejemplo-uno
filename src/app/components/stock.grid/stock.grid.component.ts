import { Component, Input, OnInit } from '@angular/core';
import { Stock } from 'src/app/models/Stock/StockInicial';

@Component({
  selector: 'app-stock-grid',
  templateUrl: './stock.grid.component.html',
  styleUrls: ['./stock.grid.component.scss'],
})
export class StockGridComponent implements OnInit {
  displayedColumns: string[] = [
    'deposito',
    'stockActual',
    'minimo',
    'maximo',
    'ubicación',
    'variante',
  ];
  @Input() selectIdStock:number;

  @Input() stocks: Stock[];

  constructor() {}

  ngOnInit() {}

}
