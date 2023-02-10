import { Producto } from './Producto';

export class ProductosResponse {
  Productos: Producto[];
  CurrentPage?: number;
  NextPage?: number;
  TotalRows?: number;
  TotalPages?: number;
  constructor(init?: Partial<ProductosResponse>) {
    Object.assign(this, init);
  }
}
