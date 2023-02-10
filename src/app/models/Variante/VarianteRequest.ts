export class VarianteRequest {
  cpInterno: number;
  database: string;
  constructor(init?: Partial<VarianteRequest>) {
    Object.assign(this, init);
  }
}
