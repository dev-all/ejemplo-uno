export class ComprobanteDetalleRequest {
  id: number;
  idcabecera: number;
  codigo: string;
  familia: string;
  cantidad: number;
  despachar: number;
  predetalle: string;
  unitario: number;
  costopro: number;
  descuento: number;
  parcial: number;
  unidad: string;
  sucursal: 0.0;
  fecha: Date;
  pactado: number;
  bonificar: number;
  valorneto: number;
  impuesto: number;
  tipoimpuesto: string;
  recargo: number;
  ivapro: number;
  cambiar: string;
  cuenta: number;
  aclaracion: string;
  grupofam: number;
  bajostock: string;
  cpinterno: number;
  nroitem: number;
  infocontab: string;
  moneda: number;
  globaldesc: number;
  fechaega: Date;
  completo: number;
  idvariante: number;
  deposito: number;

  constructor(init?: Partial<ComprobanteDetalleRequest>) {
    Object.assign(this, init);
  }
}
