import { Producto } from "./Producto";

export class ProductoResponse {
    Productos: Producto[]
    CurrentPage?: number;
    NextPage?: number;
    TotalRows?: number;
    TotalPages?: number;

    constructor(init?: Partial<Producto>) {
        Object.assign(this, init);
      }
}
