import { TipoReporte } from './TipoReporte.enum';

export class ReporteBase {
  formatoArchivo: string;
  database: string;

  nombreProducto: string;
  reporteRequest: any;
  nombreArchivo: string;
  tipoReporte: TipoReporte;
  constructor(init?: Partial<ReporteBase>) {
    Object.assign(this, init);
  }
}
