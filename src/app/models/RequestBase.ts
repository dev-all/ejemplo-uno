export class RequestBase {
  database: string;
  page?: number;
  pageSize?: number;
  orderby: string;
  constructor(init?: Partial<RequestBase>) {
    Object.assign(this, init);
  }
}
