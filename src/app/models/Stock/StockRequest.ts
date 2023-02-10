export class StockRequest {
  cpInterno: number;
  database: string;

  constructor(init?: Partial<StockRequest>) {
    Object.assign(this, init);
  }
}
