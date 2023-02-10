export class ComprobanteCabeceraRequest {
  numero: number;
  tipocbte: number;
  fecha: Date;
  cuenta: number;
  importe: number;
  plazoentrega: string;
  condicionpago: string;
  envio: string;
  facturado: string;
  oferta: string;
  nombre: string;
  pedido: string;
  oficina: string;
  lugar: string;
  listpre: number;
  factura: number;
  remito: number;
  estado: string;
  cotizado: string;
  aclaracion: string;
  auxiliar: string;
  direccion: string;
  telefono: string;
  ciudad: string;
  postal: string;
  correo: string;
  numcity: number;
  discrimina: number;
  incluyeiva: number;
  horario: string;
  vendedor: number;
  infcontab: string;
  detalle: string;
  numprovi: number;
  idpais: number;
  idlote: string;
  idtransporte: number;
  mercadopagoid: number;
  sucursal: number;
  web: number;
  
  constructor(init?: Partial<ComprobanteCabeceraRequest>) {
    Object.assign(this, init);
  }
}
