export class DepositoRequest {
  database: string;
  constructor(init?: Partial<DepositoRequest>) {
    Object.assign(this, init);
  }
}
