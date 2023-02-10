export class Proveedor {
    Codigo: number;
    Nombre: string;
    
  constructor(init?: Partial<Proveedor>) {
    Object.assign(this, init);
  }
}
